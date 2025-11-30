import Breadcrumbs from '@/components/visitor/Breadcrumbs/Breadcrumbs';
import './PageTop.scss';

interface Props {
	title?: string;
	subtitle?: string;
}

export default function PageTop({ title, subtitle }: Props) {
	return title && (
		<section className="section page-top">
			<Breadcrumbs />
			<h1 className="title title--1">{ title }</h1>
			{ subtitle && <p className="subtitle">{ subtitle }</p> }
		</section>
	);
}
