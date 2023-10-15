import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <div role="application" aria-label="Google Books Search App">
      <Navbar />
      <main role="main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
