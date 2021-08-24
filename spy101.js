const axios = require('axios');
const path = require('path');
const promisify = require('util').promisify;
const fs = require('fs');
const stream = require('stream');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const parse = require('./parse');
const finished = promisify(stream.finished);
const writeFile = promisify(fs.writeFile);
const SocksProxyAgent = require('socks-proxy-agent');
// the full socks5 address
const proxyOptions = `socks5://127.0.0.1:1080`;
// create the socksAgent for axios
const httpsAgent = new SocksProxyAgent(proxyOptions);

const saveDir = path.resolve(__dirname, 'app');
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36';
const domain = 'https://regex101.com';

const instance = axios.create({ baseURL: domain, httpsAgent, headers: { 'User-Agent': userAgent } });

const assetsCache = [];

async function spySw() {
  try {
    const resp = await instance.get('/sw.js');
    await saveAssets('/sw.js', resp.data);
    const assets = parse.parseSw(resp.data);
    assetsCache.push(...assets);
  } catch (error) {
    console.log(error);
  }
}

async function spyIndex() {
  try {
    const resp = await instance.get('/index.html');
    await saveAssets('/index.html', resp.data);
    const assets = parse.parseIndex(resp.data);
    assetsCache.push(...assets);
  } catch (error) {
    console.log(error);
  }
}

async function spyAssets() {
  try {
    for (const filepath of assetsCache) {
      const resp = await instance.get(filepath, { responseType: 'stream' });
      await saveAssets(filepath, resp.data, true);
    }
  } catch (error) {
    console.log(error);
  }
}

async function saveAssets(filepath, respData, isStream) {
  //
  const filepos = path.resolve(saveDir, filepath.replace(/^\//, ''));
  console.log(`saveing asset file ${filepath} ==> ${filepos}`);
  const basename = path.dirname(filepos);
  await mkdirp(basename);
  if (isStream) {
    const writer = fs.createWriteStream(filepos);
    respData.pipe(writer);
    await finished(writer); //this is a Promise
  } else {
    await writeFile(filepos, respData);
  }
  await checkAll(filepath, filepos);
}

async function checkAll(file, filepos) {
  if (/bundle\./.test(file)) {
    const content = fs.readFileSync(filepos, 'utf-8');
    const assets = content.match(/"assets\/.*?\.json"/g);
    if (!assets) return;
    for (const asset of assets) {
      const file = '/static/' + asset.replace(/"/g, '');
      const resp = await instance.get(file, { responseType: 'stream' });
      await saveAssets(file, resp.data, true);
    }
  }
}

async function execpull() {
  rimraf.sync(saveDir);
  await spyIndex();
  await spySw();
  await spyAssets();
}

execpull();
