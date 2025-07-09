
import React from 'react';
import { FabricPattern, PatternCategory } from '../types';
import { PatternCard } from './PatternCard';
import { CATEGORY_COLORS } from '../constants';

interface PatternSelectorPanelProps {
  patterns: FabricPattern[];
  selectedPatterns: FabricPattern[];
  onPatternSelect: (pattern: FabricPattern) => void;
  activeCategory: PatternCategory | 'All';
  onCategoryChange: (category: PatternCategory | 'All') => void;
}

export const PatternSelectorPanel: React.FC<PatternSelectorPanelProps> = ({
  patterns,
  selectedPatterns,
  onPatternSelect,
  activeCategory,
  onCategoryChange,
}) => {
  const categories = ['All', ...Object.values(PatternCategory)];

  return (
    <div className="lg:w-1/3 bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col max-h-[calc(100vh-200px)]">
      <h2 className="text-xl font-semibold text-sky-400 mb-4">Select Fabric Patterns</h2>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category as PatternCategory | 'All')}
            className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 font-medium
              ${activeCategory === category 
                ? (category === 'All' ? 'bg-sky-500 text-white' : `${CATEGORY_COLORS[category as PatternCategory]} text-white`)
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto flex-grow pr-2 space-y-3">
        {patterns.length > 0 ? (
          patterns.map(pattern => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              isSelected={selectedPatterns.some(p => p.id === pattern.id)}
              onSelect={() => onPatternSelect(pattern)}
            />
          ))
        ) : (
          <p className="text-slate-400 text-center py-4">No patterns found for this category.</p>
        )}
      </div>
    </div>
  );
};
    