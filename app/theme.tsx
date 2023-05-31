"use client";

import { useEffect, useState } from "react";

function ThemeComponent() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  useEffect(() => {
    const html = document?.querySelector('html');
    if (html !== null) {
      html?.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <label className="swap swap-flip">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on">DARKMODE</div>
      <div className="swap-off">LIGHTMODE</div>
    </label>
  );
}

export default ThemeComponent;