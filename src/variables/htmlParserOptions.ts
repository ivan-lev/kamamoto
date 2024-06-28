import { Element } from 'html-react-parser';

export const htmlParserOptions = {
  replace(domNode: any) {
    if (domNode instanceof Element && domNode.name === 'ul') {
      domNode.attribs.class = 'list';
      return domNode;
    }
    if (domNode instanceof Element && domNode.name === 'p') {
      domNode.attribs.class = 'text';
      return domNode;
    }
  }
};
