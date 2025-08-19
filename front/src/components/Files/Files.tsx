import type { Resources } from '@/types/fileType';
import { useLayoutEffect } from 'react';
import File from '@/components/File/File';
import Seo from '@/components/Seo/Seo';
import './Files.scss';

interface Props {
	title: string;
	files: Resources;
}

export default function Files({ title, files }: Props) {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<>
			<Seo title={`Камамото: ${title.charAt(0).toLowerCase()}${title.slice(1)}`} />

			<section className="section page-top">
				<h2 className="title title2">{title}</h2>
			</section>
			<section className="section files">
				<div className="container files__list">
					{files.map((file) => {
						return <File key={file.id} file={file} />;
					})}
				</div>
			</section>
		</>
	);
}
