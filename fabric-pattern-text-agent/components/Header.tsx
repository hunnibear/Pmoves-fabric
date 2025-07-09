
import React from 'react';
import { APP_TITLE } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-sky-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.25 12h.008v.008h-.008V12zm0 0h.008v.008h-.008V12zm0-3.75h.008v.008h-.008V8.25zm0 7.5h.008v.008h-.008v-.008z" />
          </svg>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">{APP_TITLE}</h1>
        </div>
        <a 
          href="https://gitmcp.io/danielmiessler/fabric" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-sky-400 hover:text-sky-300 transition-colors duration-200 flex items-center space-x-1"
        >
          <span>Inspired by Fabric</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>
    </header>
  );
};
    