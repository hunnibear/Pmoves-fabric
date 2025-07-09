
import React from 'react';
import { FabricPattern } from '../types';
import { UserInputTextarea } from './UserInputTextarea';
import { SelectedPatternsDisplay } from './SelectedPatternsDisplay';
import { PatternVariablesForm } from './PatternVariablesForm'; // New component

interface MainInteractionPanelProps {
  userInput: string;
  onUserInput: (value: string) => void;
  selectedPatterns: FabricPattern[];
  onClearSelectedPatterns: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  patternVariableValues: Record<string, string>;
  onVariableChange: (patternId: string, variableName: string, value: string) => void;
}

export const MainInteractionPanel: React.FC<MainInteractionPanelProps> = ({
  userInput,
  onUserInput,
  selectedPatterns,
  onClearSelectedPatterns,
  onSubmit,
  isLoading,
  patternVariableValues,
  onVariableChange,
}) => {
  const patternsWithVariables = selectedPatterns.filter(p => p.variables && p.variables.length > 0);

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-sky-400 mb-3">Your Text Input</h2>
        <UserInputTextarea
          value={userInput}
          onChange={onUserInput}
          placeholder="Paste or type your text here to be processed by the selected Fabric Patterns..."
        />
      </div>

      {selectedPatterns.length > 0 && (
        <SelectedPatternsDisplay
          patterns={selectedPatterns}
          onClear={onClearSelectedPatterns}
        />
      )}

      {patternsWithVariables.length > 0 && (
        <PatternVariablesForm
          patterns={patternsWithVariables}
          variableValues={patternVariableValues}
          onVariableChange={onVariableChange}
        />
      )}

      <button
        onClick={onSubmit}
        disabled={isLoading || selectedPatterns.length === 0 || !userInput.trim()}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 flex items-center justify-center"
        aria-label="Apply selected patterns and generate text"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Apply Patterns & Generate
          </>
        )}
      </button>
    </div>
  );
};