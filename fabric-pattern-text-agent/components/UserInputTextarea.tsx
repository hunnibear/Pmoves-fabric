
import React from 'react';

interface UserInputTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const UserInputTextarea: React.FC<UserInputTextareaProps> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={10}
      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200 resize-y placeholder-slate-400"
      style={{fontFamily: "'Roboto Mono', monospace"}}
    />
  );
};
    