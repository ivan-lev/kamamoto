import './Documents.scss';

import File from '../File/File';

import { documents } from '../../variables/documents';

export default function Documents(): JSX.Element {
  return (
    <section className="section documents">
      <h2 className="title title2">Шаблоны документов</h2>
      <div className="container background-muted bordered documents__list">
        {documents.map(document => {
          return <File key={document.id} file={document} />;
        })}
      </div>
    </section>
  );
}
