import { Element } from 'html-react-parser';

const mode = import.meta.env.MODE;

export const htmlParserOptions = {
	replace(domNode: unknown) {
		if (domNode instanceof Element) {
			if (domNode.name === 'p') {
				domNode.attribs.class = 'text';
			}

			else if (domNode.name === 'h2') {
				domNode.attribs.class = 'section__header';
			}

			else if (domNode.name === 'span') {
				domNode.attribs.class = 'text';
			}

			else if (['ul', 'ol'].includes(domNode.name)) {
				domNode.attribs.class = 'list';
			}

			else if (domNode.name === 'a') {
				domNode.attribs.target = domNode.attribs.class === 'self' ? '_self' : '_blank';
				domNode.attribs.class = 'link link_usual';
			}

			else if (domNode.name === 'blockquote') {
				domNode.attribs.class = 'blockquote';
			}

			else if (domNode.name === 'img') {
				domNode.attribs.class = `article-image ${domNode.attribs.class}`;
				domNode.attribs.crossorigin = 'anonymous';
				if (mode !== 'production') {
					domNode.attribs.src = `http://localhost:3000${domNode.attribs.src}`;
				}
			}

			return domNode;
		}
	},
};
