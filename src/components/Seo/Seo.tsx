import { Helmet } from 'react-helmet-async';

export default function Seo({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
    </Helmet>
  );
}
