import React, { useEffect, useState } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem("theme", newIsDarkMode ? "dark" : "light");
    if (newIsDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="lg:px-32 px-10 lg:py-10 py-5">
      <nav className="flex flex-row justify-between">
        <p className="text-3xl font-bold font-roboto bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-cyan to-accent-purple">
          SummarEase
        </p>
        <button onClick={toggleTheme} className="text-2xl">
          {isDarkMode ? (
            <SunOutlined style={{ color: "white" }} />
          ) : (
            <MoonOutlined />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
