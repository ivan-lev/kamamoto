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
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});

	return (
		<>
			<Seo title={ `Камамото: ${title.charAt(0).toLowerCase()}${title.slice(1)}` } />

			<section className="section page-top">
				<h1 className="title title--1">{ title }</h1>
			</section>
			<section className="section files">
				<div className="container files__list">
					{ files.map((file) => {
						return <File key={ file.id } file={ file } />;
					}) }
				</div>
			</section>
		</>
	);
}
