const { test } = require('node:test');
const assert = require('node:assert/strict');
const { getOutputSize, cropRect, containRect } = require('../src/image-utils.js');

test('presets têm as dimensões esperadas', () => {
  assert.deepEqual(getOutputSize('16:9'), {width:1920,height:1080});
  assert.deepEqual(getOutputSize('9:16'), {width:1080,height:1920});
  assert.deepEqual(getOutputSize('1:1'), {width:1080,height:1080});
});

test('o modo original conserva a proporção e limita grandes arquivos', () => {
  assert.deepEqual(getOutputSize('original',800,600), {width:800,height:600});
  const out = getOutputSize('original',12000,8000);
  assert.ok(out.width <= 4096 && out.width*out.height <= 8_000_000);
  assert.ok(Math.abs(out.width/out.height - 1.5)<0.001);
});

test('crop de 4:3 para 16:9 remove 375 px de cada lado vertical', () => {
  const result = cropRect(4000,3000,1920,1080);
  assert.deepEqual(result,{x:0,y:375,width:4000,height:2250});
});

test('crop mantém coordenadas dentro da imagem original', () => {
  const result = cropRect(1000,500,1080,1920);
  assert.ok(result.x>=0 && result.y>=0);
  assert.ok(result.x+result.width<=1000 && result.y+result.height<=500);
});

test('contain posiciona imagem 4:3 dentro de 16:9, sem corte', () => {
  const result = containRect(4000,3000,1920,1080);
  assert.deepEqual(result,{x:240,y:0,width:1440,height:1080});
});

test('rejeita dimensões inválidas', () => {
  assert.throws(()=>cropRect(0,200,1920,1080),RangeError);
  assert.throws(()=>containRect(100,200,0,1080),RangeError);
  assert.throws(()=>getOutputSize('??',100,100),Error);
});
