
import React from 'react';
import { FabricPattern } from '../types';
import { CATEGORY_TAG_COLORS } from '../constants';

interface SelectedPatternsDisplayProps {
  patterns: FabricPattern[];
  onClear: () => void;
}

export const SelectedPatternsDisplay: React.FC<SelectedPatternsDisplayProps> = ({ patterns, onClear }) => {
  if (patterns.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-sky-400">Selected Patterns (in order of application):</h3>
        <button
          onClick={onClear}
          className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2 p-3 bg-slate-700 rounded-md border border-slate-600">
        {patterns.map((pattern, index) => (
          <div
            key={pattern.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${CATEGORY_TAG_COLORS[pattern.category] || 'bg-gray-200 text-gray-800'}`}
            title={pattern.description}
          >
            <span className="font-bold">{index + 1}.</span>
            <span>{pattern.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
    