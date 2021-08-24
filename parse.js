function parseSw(content) {
  const matchs = content.match(/url:"\/.*?",/g);
  return matchs.map((temp) => temp.replace(/(url:"|",)/g, ''));
}

function parseIndex(content) {
  const matchs = content.match(/\/static\/.*?(?=")/g);
  return matchs;
}

exports.parseIndex = parseIndex;
exports.parseSw = parseSw;
