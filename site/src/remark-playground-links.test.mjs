import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import remarkPlaygroundLinks, { isRunnable, playgroundUrl } from './remark-playground-links.mjs';

const PROGRAM = 'fn inisiu() {\n    mostran("Olá, mundu! ✓");\n}';

function code(value, meta = null, lang = 'kriol') {
  return { type: 'code', lang, meta, value };
}

function run(tree, options) {
  remarkPlaygroundLinks(options)(tree);
  return tree;
}

function linkAfter(children, index) {
  const paragraph = children[index + 1];
  assert.equal(paragraph?.type, 'paragraph', 'no paragraph after the code block');
  return paragraph.children[0];
}

describe('playgroundUrl', () => {
  it('puts the source in the hash as base64url, the format the playground reads', () => {
    const url = new URL(playgroundUrl(PROGRAM));
    assert.equal(url.origin + url.pathname, 'https://play.kriol.dev/');
    const params = new URLSearchParams(url.hash.slice(1));
    assert.equal(Buffer.from(params.get('code'), 'base64url').toString('utf8'), PROGRAM);
    assert.equal(params.has('fname'), false);
  });

  it('names the editor tab after the file, when the block has one', () => {
    const params = new URLSearchParams(new URL(playgroundUrl(PROGRAM, { file: 'ola.kriol' })).hash.slice(1));
    assert.equal(params.get('fname'), 'ola.kriol');
  });

  it('can point at another playground, such as a local one', () => {
    assert.match(playgroundUrl(PROGRAM, { base: 'http://localhost:3000/' }), /^http:\/\/localhost:3000\/#code=/);
  });
});

describe('isRunnable', () => {
  it('is a Kriol block with an inisiu, where a program starts', () => {
    assert.equal(isRunnable(code(PROGRAM)), true);
    assert.equal(isRunnable(code(PROGRAM, null, 'kr')), true);
  });

  it('is not a fragment, a template or another language', () => {
    assert.equal(isRunnable(code('int x = 1;')), false);
    assert.equal(isRunnable(code('fn <nome>(<parâmetros>) <tipo_retorno> {\n}')), false);
    assert.equal(isRunnable(code('// fn inisiu() vem depois\nint x = 1;')), false);
    assert.equal(isRunnable(code(PROGRAM, null, 'bash')), false);
  });

  it('is not a block marked no-playground, such as one that needs an earlier block', () => {
    assert.equal(isRunnable(code(PROGRAM, 'no-playground')), false);
    assert.equal(isRunnable(code(PROGRAM, 'title="ola.kriol" no-playground')), false);
  });
});

describe('remarkPlaygroundLinks', () => {
  it('adds a link that opens the program in a new tab, right after it', () => {
    const tree = run({ type: 'root', children: [code(PROGRAM), { type: 'paragraph', children: [] }] });
    const link = linkAfter(tree.children, 0);
    assert.equal(link.type, 'link');
    assert.equal(link.url, playgroundUrl(PROGRAM));
    assert.deepEqual(link.data.hProperties, { target: '_blank', rel: ['noopener'] });
    assert.equal(link.children[0].value, 'Abrir no playground');
    assert.equal(tree.children.length, 3);
  });

  it('gives the file name of the block title to the playground', () => {
    const tree = run({ type: 'root', children: [code(PROGRAM, 'title="ola.kriol"')] });
    assert.equal(linkAfter(tree.children, 0).url, playgroundUrl(PROGRAM, { file: 'ola.kriol' }));
  });

  it('finds programs inside lists, asides and tabs', () => {
    const item = { type: 'listItem', children: [code(PROGRAM)] };
    const aside = { type: 'containerDirective', name: 'note', children: [code(PROGRAM)] };
    const tree = run({ type: 'root', children: [{ type: 'list', children: [item] }, aside] });
    assert.equal(linkAfter(item.children, 0).type, 'link');
    assert.equal(linkAfter(aside.children, 0).type, 'link');
  });

  it('leaves other blocks as they are', () => {
    const children = [code('int x = 1;'), code(PROGRAM, 'no-playground'), code('ls', null, 'bash')];
    const tree = run({ type: 'root', children: structuredClone(children) });
    assert.deepEqual(tree.children, children);
  });

  it('uses the playground it is given', () => {
    const tree = run({ type: 'root', children: [code(PROGRAM)] }, { base: 'http://localhost:3000/' });
    assert.match(linkAfter(tree.children, 0).url, /^http:\/\/localhost:3000\/#code=/);
  });
});
