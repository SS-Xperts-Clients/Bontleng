import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/AppHeader.jsx';
import { AppFooter } from './components/AppFooter.jsx';
import { BottomActionBar } from './components/BottomActionBar.jsx';
import { ScrollManager } from './components/ScrollManager.jsx';

export function App() {
  return (
    <>
      <ScrollManager />
      <AppHeader />
      <main id="main-content">
        <Outlet />
      </main>
      <AppFooter />
      <BottomActionBar />
    </>
  );
}
