import './About.scss';

import avatar from '/avatar.jpg';

export default function About() {
  return (
    <section className="section about">
      <img className="about__avatar" src={avatar}></img>
      <div className="about__heading">
        <h2 className="title title2">Иван Лев</h2>
        <p className="subtitle">Коллекционер японской керамики</p>
      </div>

      <div className="about__content container background-muted bordered">
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
        <a className="link link_instagram background-muted bordered" href="#">
          Instagram
        </a>
        <a className="link link_telegram background-muted bordered" href="#">
          Telegram
        </a>
        <a className="link link_mail background-muted bordered" href="#">
          Email
        </a>
      </div>
    </section>
  );
}
