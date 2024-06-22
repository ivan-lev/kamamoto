import './Files.scss';

import File from '../File/File';

import { files } from '../../variables/files';

export default function Files(): JSX.Element {
  return (
    <section className="section files">
      <h2 className="title title2">Файлы для скачивания</h2>
      <div className="container background-muted bordered files__list">
        {files.map(file => {
          return <File key={file.id} file={file} />;
        })}
      </div>
    </section>
  );
}
