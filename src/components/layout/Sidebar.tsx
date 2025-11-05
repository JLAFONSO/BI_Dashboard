import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, Settings, BarChart3 } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-brand-primary text-white shadow-lg'
        : 'text-gray-300 hover:bg-dark-card hover:text-white'
    }`;

  return (
    <aside className="w-64 bg-gray-900 p-4 flex flex-col border-r border-dark-border">
      <div className="flex items-center mb-10 px-2">
        <BarChart3 className="h-10 w-10 text-brand-primary" />
        <h1 className="text-2xl font-bold text-white ml-3">BI-App</h1>
      </div>
      <nav className="flex flex-col space-y-3">
        <NavLink to="/" className={navLinkClasses}>
          <LayoutDashboard className="mr-4" />
          <span>Painel Principal</span>
        </NavLink>
        <NavLink to="/upload" className={navLinkClasses}>
          <Upload className="mr-4" />
          <span>Gestão de Dados</span>
        </NavLink>
        {/* Placeholder for future functionality */}
        <NavLink to="/settings" className={navLinkClasses} onClick={(e) => e.preventDefault()}>
          <Settings className="mr-4" />
          <span className="text-gray-500">Configurações</span>
        </NavLink>
      </nav>
      <div className="mt-auto text-center text-gray-500 text-xs">
        <p>&copy; 2025 Dualite Alpha</p>
        <p>Versão 2.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
