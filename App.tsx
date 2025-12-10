import React, { useState, useEffect } from 'react';
import { Layout } from './components/ui/Layout';
import { Hero } from './components/Hero';
import { Builder } from './components/Builder';
import { Result } from './components/Result';
import { SavedPrompts } from './components/SavedPrompts';
import { AppStep, UserPreferences, GeneratedResult, SavedPrompt } from './types';
import { generateDetailedPrompt } from './services/geminiService';
import { Button } from './components/ui/Button';

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.HOME);
  const [currentResult, setCurrentResult] = useState<GeneratedResult | null>(null);
  const [currentPreferences, setCurrentPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  // Load saved prompts on mount
  useEffect(() => {
    const saved = localStorage.getItem('lumina_saved_prompts');
    if (saved) {
      setSavedPrompts(JSON.parse(saved));
    }
  }, []);

  // Persist saved prompts
  useEffect(() => {
    localStorage.setItem('lumina_saved_prompts', JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  const handleGenerate = async (prefs: UserPreferences) => {
    setIsLoading(true);
    setCurrentPreferences(prefs);
    try {
      const result = await generateDetailedPrompt(prefs);
      setCurrentResult(result);
      setStep(AppStep.RESULT);
    } catch (error) {
      alert('Failed to generate prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePrompt = (finalPrompt: string) => {
    if (!currentPreferences) return;
    
    const newSaved: SavedPrompt = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      originalInput: currentPreferences,
      finalPrompt
    };
    
    setSavedPrompts(prev => [newSaved, ...prev]);
    setShowSaved(true);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  };

  const handleLoadSaved = (saved: SavedPrompt) => {
    setCurrentResult({
      prompt: saved.finalPrompt,
      modelSuggested: 'loaded-from-save'
    });
    setCurrentPreferences(saved.originalInput);
    setStep(AppStep.RESULT);
    setShowSaved(false);
  };

  return (
    <Layout 
      headerAction={
        step !== AppStep.HOME && (
          <Button variant="ghost" onClick={() => setShowSaved(true)} className="text-sm">
            Saved ({savedPrompts.length})
          </Button>
        )
      }
    >
      {step === AppStep.HOME && (
        <Hero onStart={() => setStep(AppStep.BUILDER)} />
      )}

      {step === AppStep.BUILDER && (
        <Builder onGenerate={handleGenerate} isLoading={isLoading} />
      )}

      {step === AppStep.RESULT && currentResult && (
        <Result 
          result={currentResult} 
          onSave={handleSavePrompt} 
          onReset={() => setStep(AppStep.BUILDER)} 
        />
      )}

      {/* Saved Prompts Sidebar */}
      {showSaved && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" 
            onClick={() => setShowSaved(false)}
          />
          <SavedPrompts 
            prompts={savedPrompts} 
            onSelect={handleLoadSaved} 
            onDelete={handleDeleteSaved} 
            onClose={() => setShowSaved(false)} 
          />
        </>
      )}
    </Layout>
  );
}