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

    if (domNode instanceof Element && domNode.name === 'span') {
      domNode.attribs.class = 'text';
      domNode.attribs.target = '_blank';
      return domNode;
    }

    if (domNode instanceof Element && domNode.name === 'a') {
      domNode.attribs.class = 'link link_usual';
      domNode.attribs.target = '_blank';
      return domNode;
    }

    if (domNode instanceof Element && domNode.name === 'blockquote') {
      domNode.attribs.class = 'blockquote container background-muted';
      domNode.attribs.target = '_blank';
      return domNode;
    }
  }
};
