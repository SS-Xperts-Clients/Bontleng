import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/AppHeader.jsx';
import { AppFooter } from './components/AppFooter.jsx';
import { BottomActionBar } from './components/BottomActionBar.jsx';

export function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
      <BottomActionBar />
    </>
  );
}
