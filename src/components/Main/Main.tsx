import { Outlet } from 'react-router-dom';

import './Main.scss';

// Outlet component render the children components
export default function Main() {
  return (
    <main className="content">
      <Outlet />
    </main>
  );
}
