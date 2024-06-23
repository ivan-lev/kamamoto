import './About.scss';

import avatar from '/avatar.jpg';

import { socialLinks } from '../../variables/socialLinks';

export default function About() {
  return (
    <section className="section about">
      <img className="about__avatar" src={avatar}></img>
      <div className="about__heading">
        <h2 className="title title2">Иван Лев</h2>
        <ul className="list">
          <li>Коллекционер японской керамики</li>
          <li>Ценитель китайского чая</li>
          <li>Веб-разработчик</li>
        </ul>
        <a className="link about__anchor-link" href="#about-author">
          <img className="background-muted bordered link__icon" src="/icons/link-arrow-down.svg" />
          Обо мне
        </a>
      </div>

      <div id="about-author" className="about__content container background-muted bordered">
        <h3 className="title title3">Созерцая красоту</h3>
        <p className="text">
          As a freelance web designer and developer, I bring a unique combination of creativity and
          technical expertise to every project. With a keen eye for design and a passion for
          delivering user-friendly web experiences, I work closely with clients to understand their
          needs and bring their vision to life.
        </p>
        <p className="text">
          My approach is rooted in collaboration and communication, and I take pride in my ability
          to explain technical concepts in simple terms. Whether I'm developing a new website from
          scratch or optimizing an existing site for search engines, I always strive for excellence
          in both form and function. With a dedication to quality and a commitment to staying on top
          of the latest trends and technologies, I am confident in my ability to deliver exceptional
          results that exceed my clients' expectations.
        </p>
      </div>
      <div className="about__links">
        {socialLinks.map(socialLink => {
          return (
            <a
              className="link background-muted bordered about__link"
              href={socialLink.link}
              key={socialLink.id}
            >
              <img className="about__icon" src={socialLink.icon} />
              {socialLink.title}
            </a>
          );
        })}
      </div>
    </section>
  );
}
