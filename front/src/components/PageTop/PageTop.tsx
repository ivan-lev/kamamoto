import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import './PageTop.scss';

interface Props {
	title?: string;
}

export default function PageTop({ title }: Props) {
	return title && (
		<section className="section page-top">
			<Breadcrumbs />
			<h3 className="title title3">{ title }</h3>
		</section>
	);
}
