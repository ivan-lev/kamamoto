import { HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';

const mode = import.meta.env.MODE;

function isElement(node: DOMNode): node is Element {
  return node.type === 'tag';
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
				attribs.class = 'list';
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
	}
};
