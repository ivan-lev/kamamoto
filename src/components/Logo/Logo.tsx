import './Logo.scss';

export default function Logo(): JSX.Element {
  return (
    <a className="logo" href="#">
      <img className="logo__link" src="logo.png" alt="logo"></img>
    </a>
  );
}
