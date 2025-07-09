
import React from 'react';
import { FabricPattern, PatternVariable } from '../types';

interface PatternVariablesFormProps {
  patterns: FabricPattern[]; // Only patterns that have variables
  variableValues: Record<string, string>; // flat map: "patternId_variableName": "value"
  onVariableChange: (patternId: string, variableName: string, value: string) => void;
}

export const PatternVariablesForm: React.FC<PatternVariablesFormProps> = ({
  patterns,
  variableValues,
  onVariableChange,
}) => {
  if (patterns.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-md font-semibold text-sky-400">Configure Pattern Options:</h3>
      {patterns.map(pattern => (
        <div key={pattern.id} className="p-4 bg-slate-700 rounded-md border border-slate-600 space-y-3">
          <h4 className="font-medium text-slate-200">{pattern.name} Options:</h4>
          {pattern.variables?.map(variable => {
            const variableKey = `${pattern.id}_${variable.name}`;
            return (
              <div key={variableKey}>
                <label htmlFor={variableKey} className="block text-sm font-medium text-slate-300 mb-1">
                  {variable.name}
                  <span className="text-slate-400 text-xs ml-1">({variable.description})</span>
                </label>
                <input
                  type="text"
                  id={variableKey}
                  name={variableKey}
                  value={variableValues[variableKey] || ''}
                  onChange={(e) => onVariableChange(pattern.id, variable.name, e.target.value)}
                  placeholder={variable.defaultValue ? `Default: ${variable.defaultValue}` : 'Enter value'}
                  className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200 placeholder-slate-400"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};