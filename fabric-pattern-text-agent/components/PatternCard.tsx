
import React from 'react';
import { FabricPattern } from '../types';
import { CATEGORY_TAG_COLORS } from '../constants';

interface PatternCardProps {
  pattern: FabricPattern;
  isSelected: boolean;
  onSelect: () => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, isSelected, onSelect }) => {
  const categoryColor = CATEGORY_TAG_COLORS[pattern.category] || "bg-gray-200 text-gray-800";
  const hasVariables = pattern.variables && pattern.variables.length > 0;

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 ease-in-out border-2 
                  ${isSelected ? 'bg-sky-700 border-sky-500 ring-2 ring-sky-400' : 'bg-slate-700 hover:bg-slate-600 border-slate-600 pattern-card-hover'}
                 `}
      aria-selected={isSelected}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className="flex justify-between items-start">
        <h3 className={`text-md font-semibold ${isSelected ? 'text-white': 'text-sky-300'}`}>
          {pattern.name}
          {hasVariables && <span className="text-sky-400 ml-1" title="This pattern has configurable options">*</span>}
        </h3>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColor}`}>
          {pattern.category}
        </span>
      </div>
      <p className={`mt-1 text-sm ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>{pattern.description}</p>
      {pattern.example && (
         <p className={`mt-2 text-xs italic ${isSelected ? 'text-sky-200' : 'text-sky-400'}`}>
           E.g., {pattern.example}
         </p>
      )}
    </div>
  );
};