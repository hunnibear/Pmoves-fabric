
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FabricPattern, PatternCategory } from './types';
import { ALL_PATTERNS } from './data/fabricPatterns';
import { generateTextWithPatterns } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PatternSelectorPanel } from './components/PatternSelectorPanel';
import { MainInteractionPanel } from './components/MainInteractionPanel';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
// PatternVariablesForm will be created in a new file
// For now, let's assume it will be part of MainInteractionPanel or App for simplicity if not making a new file
// import { PatternVariablesForm } from './components/PatternVariablesForm';


const App: React.FC = () => {
  const [selectedPatterns, setSelectedPatterns] = useState<FabricPattern[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [geminiOutput, setGeminiOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PatternCategory | 'All'>('All');
  const [patternVariableValues, setPatternVariableValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const newVariableValues: Record<string, string> = {};
    selectedPatterns.forEach(p => {
      if (p.variables) {
        p.variables.forEach(v => {
          const key = `${p.id}_${v.name}`;
          // Only set if not already set by user, or initialize with default
           if (patternVariableValues[key] === undefined || !selectedPatterns.find(sp => sp.id === p.id)) {
             newVariableValues[key] = v.defaultValue || '';
           } else {
             newVariableValues[key] = patternVariableValues[key];
           }
        });
      }
    });
     // Prune variables that are no longer relevant from deselected patterns
     const relevantVariableValues: Record<string, string> = {};
     Object.keys(patternVariableValues).forEach(key => {
        const patternId = key.split('_')[0];
        if (selectedPatterns.some(p => p.id === patternId && p.variables?.some(v => `${p.id}_${v.name}` === key))) {
            relevantVariableValues[key] = patternVariableValues[key];
        }
     });


    selectedPatterns.forEach(p => {
        if (p.variables) {
            p.variables.forEach(v => {
                const key = `${p.id}_${v.name}`;
                if (relevantVariableValues[key] === undefined) { // if new pattern selected or variable was pruned
                    relevantVariableValues[key] = v.defaultValue || '';
                }
            });
        }
    });
    setPatternVariableValues(relevantVariableValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatterns]); // Rerun when selectedPatterns change to init/prune variables

  const handlePatternSelect = useCallback((pattern: FabricPattern) => {
    setSelectedPatterns(prev => {
      const isCurrentlySelected = prev.find(p => p.id === pattern.id);
      if (isCurrentlySelected) {
        return prev.filter(p => p.id !== pattern.id);
      } else {
        return [...prev, pattern];
      }
    });
  }, []);

  const handleClearSelectedPatterns = useCallback(() => {
    setSelectedPatterns([]);
    setPatternVariableValues({});
  }, []);

  const handleVariableChange = useCallback((patternId: string, variableName: string, value: string) => {
    setPatternVariableValues(prev => ({
      ...prev,
      [`${patternId}_${variableName}`]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter some text to process.');
      return;
    }
    if (selectedPatterns.length === 0) {
      setError('Please select at least one Fabric Pattern.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeminiOutput('');

    try {
      const result = await generateTextWithPatterns(userInput, selectedPatterns, patternVariableValues);
      setGeminiOutput(result);
    } catch (err) {
      console.error('Error generating content:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Check console for details. Ensure API_KEY is set.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, selectedPatterns, patternVariableValues]);

  const filteredPatterns = useMemo(() => {
    if (activeCategory === 'All') {
      return ALL_PATTERNS;
    }
    return ALL_PATTERNS.filter(pattern => pattern.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-sky-500 selection:text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <PatternSelectorPanel
          patterns={filteredPatterns}
          selectedPatterns={selectedPatterns}
          onPatternSelect={handlePatternSelect}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="lg:w-2/3 flex flex-col gap-6">
          <MainInteractionPanel
            userInput={userInput}
            onUserInput={setUserInput}
            selectedPatterns={selectedPatterns}
            onClearSelectedPatterns={handleClearSelectedPatterns}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            patternVariableValues={patternVariableValues}
            onVariableChange={handleVariableChange}
          />
          {isLoading && <div className="flex justify-center items-center p-6"><LoadingSpinner /></div>}
          {error && <div className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded-md" role="alert">{error}</div>}
          {geminiOutput && !isLoading && <ResultDisplay output={geminiOutput} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
