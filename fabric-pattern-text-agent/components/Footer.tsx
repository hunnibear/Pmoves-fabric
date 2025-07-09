
import React from 'react';
import { APP_TITLE } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-400 py-6 mt-auto shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved (conceptually).</p>
        <p className="text-xs mt-1">Powered by React, Tailwind CSS, and Gemini API.</p>
      </div>
    </footer>
  );
};
    