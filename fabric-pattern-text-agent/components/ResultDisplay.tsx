
import React from 'react';

interface ResultDisplayProps {
  output: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ output }) => {
  // Basic markdown-like formatting for newlines
  const formattedOutput = output.split('\n').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold text-sky-400 mb-4">Generated Output</h2>
      <div className="bg-slate-700 p-4 rounded-md border border-slate-600 max-h-96 overflow-y-auto">
        <pre className="text-slate-200 whitespace-pre-wrap break-words" style={{fontFamily: "'Roboto Mono', monospace"}}>
          {formattedOutput}
        </pre>
      </div>
    </div>
  );
};
    