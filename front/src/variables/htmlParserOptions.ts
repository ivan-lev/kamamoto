import { Element } from 'html-react-parser';

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

			return domNode;
		}
	},
};
