!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="/static/",n(n.s="tMYL")}({tMYL:function(e,r){importScripts("/static/pcre2lib.js");const n=-1,t=-48,o=1,u=2,a=4,l=8,c=16,s=32,i=64,b=128,f=512,d=1024,m=8192,p=131072,M=262144,g=524288,_=2097152,k=65536,w=256,h=512,x=1024,y=4096,S=131072,v=2097152,j=2147483648,T=Module.cwrap("pcre2_compile_16","number",["number","number","number","number","number","number"]),U=Module.cwrap("pcre2_substitute_16","number",["number","number","number","number","number","number","number","number","number","number","number"]),O=Module.cwrap("pcre2_code_free_16","number",["number"]),P=Module.cwrap("pcre2_match_context_create_16","number",["number"]),V=Module.cwrap("pcre2_match_context_free_16","number",["number"]),E=Module.cwrap("pcre2_get_error_message_16","number",["number","number","number"]);let $={};function B(e){try{const{regex:O,testString:B,substString:A,listMode:L}=e.data;let{flags:N}=e.data;L&&(N+="Q");const Q=function(e,r){let t=0,y=h|x;if($){if($.pattern===e&&$.flags===r)return;F()}for(let n=0,h=r.length;n<h;n++)switch(r[n]){case"g":y|=w;break;case"A":t|=j;break;case"E":t|=o;break;case"X":t|=u;break;case"C":t|=_;break;case"i":t|=l;break;case"D":t|=c;break;case"s":t|=s;break;case"J":t|=i;break;case"x":t|=b;break;case"N":t|=f;break;case"m":t|=d;break;case"n":t|=m;break;case"u":t|=p|g;break;case"U":t|=M;break;case"Y":t|=k;break;case"Z":t|=a;break;case"Q":y|=S;break;default:throw new Error(`Unknown option '${r[n]}' supplied.`)}$.pattern=e,$.flags=r,$.optionBits=t|v,$.matchBits=y;const U=Module._malloc(8),O=U,P=U+4,V=Y(e),B=T(V,n,t,O,P,0);if(Module._free(V),!B){const e=`${function(e){const r=Module._malloc(512);let n=`Error ${e}`;return E(e,r,256)>0&&(n=Module.UTF16ToString(r)),Module._free(r),n}(Module.getValue(O,"i32"))} - offset: ${Module.getValue(P,"i32")}`;return Module._free(U),F(),e||"Unknown compilation error"}$.regex=B,Module._free(U)}(O,N);if(Q)return void self.postMessage({error:Q,result:null});const z=performance.now(),C=function(e,r){if(!$.regex)throw new Error("No pattern supplied to matching function!");const o=Module._malloc(4),u=Y(e),a=e.length,l=Y(r),c=P(0);let s,i;Module.setValue(o,Math.max(65536,2*a+1),"i32");let b=null,f=null;for(let d=y;;d=0){if(s=d?Module._malloc(2*Module.getValue(o,"i32")):Module._realloc(s,2*Module.getValue(o,"i32")),(i=U($.regex,u,a,0,$.matchBits|d,0,c,l,n,s,o))>=0){f=Module.UTF16ToString(s);break}if(d&&i!==t){b=i||"Unknown engine error";break}if(!d)break}return V(c),Module._free(s),Module._free(l),Module._free(u),{error:b,result:f}}(B,A);C.time=performance.now()-z,self.postMessage(C)}catch(r){console.error("An unhandled error was thrown, please report this",r),self.postMessage({error:r.message||"Unknown error occurred"})}}function F(){$.regex&&O($.regex),$={}}function Y(e){const r=2*e.length+2,n=Module._malloc(r);return Module.stringToUTF16(e,n,r),n}Module.onRuntimeInitialized=function(){self.onmessage=B,self.postMessage("onload")}}});