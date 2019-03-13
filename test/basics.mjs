// -*- coding: utf-8, tab-width: 2 -*-

import equal from 'equal-pmb';

// ¦mjsUsageDemo¦+
import guillotine from '..';
// ¦mjsUsageDemo¦- importPkgName

// ¦mjsUsageDemo¦+

function lines(...args) { return args.join('\n'); }
function buf(x) { return Buffer.from(x); }

const blob1 = buf(lines('{"hello":"world","foo":"bar"}', '',
  'How are', 'you today?', ''));
const [meta1, body1] = guillotine.chop(blob1);
equal(meta1, { hello: 'world', foo: 'bar' });
equal.buf(body1, '\nHow are\nyou today?\n');

const blobStr2 = guillotine.recombine(meta1, String(body1));
const blobBuf2 = guillotine.recombine(meta1, body1);
const expect2 = lines(
  '{ "foo": "bar",',
  '  "hello": "world"',
  '}',
  '',
  'How are',
  'you today?',
  '');
equal(blobStr2, expect2);
equal.buf(blobBuf2, expect2);

const [metaStr2, bodyStr2] = guillotine.chop(blobStr2);
equal(metaStr2, meta1);
equal(bodyStr2, String(body1));

const [metaBuf2, bodyBuf2] = guillotine.chop(blobBuf2);
equal(metaBuf2, meta1);
equal(bodyBuf2, body1);

// ¦mjsUsageDemo¦-







console.info('+OK usage test passed.');
