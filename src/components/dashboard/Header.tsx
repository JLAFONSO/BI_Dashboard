import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-dark-card p-4 mb-8 rounded-lg shadow-md">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-gray-400">{subtitle}</p>
      </div>
    </header>
  );
};

export default Header;
