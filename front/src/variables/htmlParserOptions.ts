import type { DOMNode, Element, HTMLReactParserOptions } from 'html-react-parser';
import { Text } from 'html-react-parser';

const mode = import.meta.env.MODE;

// соседи и дети узла: DOMNode плюс CDATA
type ChildNode = Element['children'][number];

function isElement(node: DOMNode | ChildNode): node is Element {
	return node.type === 'tag';
}

// Заголовок списка источников в конце статьи; tiptap не сохраняет классы, поэтому список узнаём по заголовку
const SOURCES_HEADER = /^(?:источники|список источников):?$/i;

function getText(node: ChildNode): string {
	if (node instanceof Text) {
		return node.data;
	}
	return isElement(node) ? node.children.map(child => getText(child)).join('') : '';
}

function isSourcesList(node: Element) {
	// между тегами лежат текстовые узлы-переносы, пропускаем их
	let prev = node.prev;
	while (prev && !isElement(prev)) {
		prev = prev.prev;
	}
	if (!prev || !isElement(prev) || prev.name !== 'h3') {
		return false;
	}
	const text = getText(prev).replace(/\s+/g, ' ').trim();
	return SOURCES_HEADER.test(text);
}

export const htmlParserOptions: HTMLReactParserOptions = {
	replace(domNode) {
		if (isElement(domNode)) {
			const { name, attribs } = domNode;

			if (name === 'p') {
				attribs.class = 'text';
			}

			else if (name === 'h2') {
				attribs.class = 'section__header';
			}

			else if (name === 'span') {
				attribs.class = 'text';
			}

			else if (['ul', 'ol'].includes(name)) {
				attribs.class = isSourcesList(domNode) ? 'list list--sources' : 'list';
			}

			else if (name === 'a') {
				attribs.target = attribs.class === 'self' ? '_self' : '_blank';
				attribs.class = 'link link_usual';
			}

			else if (name === 'blockquote') {
				attribs.class = 'blockquote';
			}

			else if (name === 'img') {
				attribs.class = `article-image ${attribs.class || ''}`;
				attribs.crossorigin = 'anonymous';
				if (mode !== 'production') {
					attribs.src = `http://localhost:3000${attribs.src}`;
				}
			}

			return domNode;
		}
	},
};
