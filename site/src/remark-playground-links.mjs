// Adds «Abrir no playground» under each Kriol program of the docs, so a reader
// can run it without copying it. The playground reads the code from the hash:
//
//   https://play.kriol.dev/#code=<base64url of the UTF-8 source>&fname=<name>.kriol
//
// A program is a Kriol block with an `inisiu`. A block that is not complete on
// its own, such as one that uses a function from an earlier block, is marked
// `no-playground` after the language: ```kriol no-playground

export const PLAYGROUND_URL = 'https://play.kriol.dev/';
export const NO_PLAYGROUND = 'no-playground';

const KRIOL_LANGS = new Set(['kriol', 'kr']);
const ENTRY_POINT = /^\s*fn\s+inisiu\s*\(/m;
const TITLE = /\btitle="([^"]+)"/;
const LINK_TEXT = 'Abrir no playground';

export function isRunnable({ lang, meta, value }) {
  return KRIOL_LANGS.has(lang) && !hasFlag(meta, NO_PLAYGROUND) && ENTRY_POINT.test(value);
}

export function playgroundUrl(source, { file, base = PLAYGROUND_URL } = {}) {
  const params = new URLSearchParams({ code: Buffer.from(source, 'utf8').toString('base64url') });
  if (file)
    params.set('fname', file);
  return `${base}#${params}`;
}

export default function remarkPlaygroundLinks({ base = PLAYGROUND_URL } = {}) {
  return (tree) => addLinks(tree, base);
}

function addLinks(parent, base) {
  const children = parent.children ?? [];
  for (let index = 0; index < children.length; index += 1) {
    const node = children[index];
    if (node.type === 'code') {
      if (isRunnable(node)) {
        children.splice(index + 1, 0, linkParagraph(playgroundUrl(node.value, { file: node.meta?.match(TITLE)?.[1], base })));
        index += 1;
      }
    } else {
      addLinks(node, base);
    }
  }
}

function linkParagraph(url) {
  return {
    type: 'paragraph',
    data: { hProperties: { className: ['playground-link'] } },
    children: [{
      type: 'link',
      url,
      data: { hProperties: { target: '_blank', rel: ['noopener'] } },
      children: [{ type: 'text', value: LINK_TEXT }],
    }],
  };
}

function hasFlag(meta, flag) {
  return (meta ?? '').split(/\s+/).includes(flag);
}
