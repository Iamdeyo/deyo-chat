import { useEffect, useState } from 'react';
import { FiMessageSquare, FiMonitor, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system'
  ); // State to track theme mode

  // Function to toggle the theme mode
  const toggleThemeMode = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
    } else if (themeMode === 'dark') {
      setThemeMode('system');
    } else {
      setThemeMode('light');
    }
  };
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

  const systemMode = () => {
    if (themeMode === 'system') {
      const systemMode = prefersDarkMode.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('class', systemMode);
    }
  };

  prefersDarkMode.addEventListener('change', (e) => {
    systemMode();
  });

  // Effect to apply the theme class to the <html> tag
  useEffect(() => {
    switch (themeMode) {
      case 'light':
        document.documentElement.removeAttribute('class');
        localStorage.setItem('theme', 'light');
      case 'dark':
        document.documentElement.setAttribute('class', themeMode);
        localStorage.setItem('theme', 'dark');

      default:
        systemMode();
        localStorage.removeItem('theme');
    }
  }, [themeMode]);
  return (
    <div className="navBar">
      <div className="logo">
        <span className="icon">
          <FiMessageSquare size={30} />
          <span className="D">D</span>
        </span>
        <span className="title">Deyo Chat</span>
      </div>
      <div className={'themeToggle ' + themeMode} onClick={toggleThemeMode}>
        <FiMonitor />
        <FiSun />
        <FiMoon />
      </div>
    </div>
  );
};
export default Navbar;
