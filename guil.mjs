import splitOnce from 'split-string-or-buffer-once-pmb';
import stripBom from 'stripbom';
import safeSortedJsonize from 'safe-sortedjson';
import isStr from 'is-string';


const spacedContainer = /^(\[|\{)[\r\n]*[ \t]/;


function guessNeckType(blob) {
  const start = stripBom(blob.slice(0, 16).toString('latin1'));
  const opener = (spacedContainer.exec(start) || false)[1];
  if (opener === '{') { return '\n}'; }
  if (opener === '[') { return '\n]'; }
  return '\n';
}


function chop(blob) {
  const neck = guessNeckType(blob);
  const [rawHead, body] = splitOnce({ sep: neck, notFound: 'just0' }, blob);
  const headers = JSON.parse(stripBom(rawHead.toString('utf8')) + neck);
  return [headers, body];
}


function recombine(headers, body) {
  const headJson = safeSortedJsonize(headers) + '\n';
  if (isStr(body)) { return headJson + body; }
  if (Buffer.isBuffer(body)) {
    const headBuf = Buffer.from(headJson, 'utf8');
    return Buffer.concat([headBuf, body]);
  }
  throw new TypeError('Unsupported body type! Expected a String or Buffer.');
}


export default {
  chop,
  recombine,
};
