import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';
import Seo from '@/components/visitor/Seo/Seo';
import './Assistants.scss';

export default function Assistants() {
	const { pathname } = useLocation();

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});

	return (
		<>
			<Seo
				title="Камамото: помощники проекта"
				description="Страница о людях, внесших вклад в развитие коллекции: мастера чайной церемонии, востоковеды"
				canonicalUrl={ `${pathname.replace(/\//g, '')}` }
			/>

			<section className="section page-top">
				<h1 className="title title--1">Помощники проекта</h1>
				<p className="subtitle"> Страница, на которой я хочу рассказать о людях, которые внесли свой вклад в развитие проекта</p>
			</section>

			<section>
				<div className="assistants">
					<div className="container assistants__card">
						<img className="assistants__photo" src="/images/people/smirnova-n.jpg" alt="Фото помощника проекта" />

						<a className="link link_usual assistants__name" href="https://vk.com/id18845601">
							Смирнова Наталья
						</a>
						<p className="assistants__about">
							Председатель Челябинского регионального отделения Всероссийского Общества "Россия -
							Япония", руководитель АНО ИКЦ урало-японских связей "RAKUDA".
						</p>
						<p className="assistants__content text">
							Наталья предложила идею проведения первой выставки (и вообще идею выставок как
							таковых). Таким образом, с её подачи и при её помощи коллекцию впервые увидел широкий
							круг людей, а она сама стала организатором нескольких мероприятий, на которых была
							представлена керамика из коллекции.
						</p>
					</div>

					<div className="container assistants__card">
						<img className="assistants__photo" src="/images/people/tretyakova-m.jpg" alt="Фото помощника проекта" />

						<a className="link link_usual assistants__name" href="https://vk.com/id246244448">
							Третьякова Мария
						</a>
						<p className="assistants__about">
							Специалист по японскому языку и культуре. Кандидат искусствоведения, Doctor of Fine
							Arts (Japan), докторантура Киотского университета искусства и дизайна (Япония).
						</p>
						<p className="text assistants__content">
							Мария вносит большой вклад в перевод каллиграфии на японских вещах. С её помощью
							образы предметов наполняются более глубоким смыслом, а красивая японская вязь
							превращается в осмысленный текст, который дополняет общее ощущение от созерцаемой
							вещи.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}
