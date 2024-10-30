// Types
import type { Resources } from '../../types/fileType';

// React
import { useLayoutEffect } from 'react';

// Components
import File from '../File/File';
import Seo from '../Seo/Seo';

import './Files.scss';

export default function Files({ title, files }: { title: string; files: Resources }): JSX.Element {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<>
			<Seo title={`Камамото: ${title.charAt(0).toLowerCase()}${title.slice(1)}`} />

			<section className="section files">
				<h2 className="title title2">{title}</h2>
				<div className="container background-muted bordered files__list">
					{files.map((file) => {
						return <File key={file.id} file={file} />;
					})}
				</div>
			</section>
		</>
	);
}
