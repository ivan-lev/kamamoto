import type { Resource } from '../../types/fileType';

import './File.scss';

export default function File({ file }: { file: Resource }) {
  return (
    <div className="file">
      <a className="file__link" href={file.link} download>
        <img className="file__preview" src={file.preview}></img>
      </a>
      <p className="file__description">{file.description}</p>
    </div>
  );
}
