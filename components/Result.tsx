import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { GeneratedResult } from '../types';

interface ResultProps {
  result: GeneratedResult;
  onSave: (finalPrompt: string) => void;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({ result, onSave, onReset }) => {
  const [editablePrompt, setEditablePrompt] = useState(result.prompt);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEditablePrompt(result.prompt);
  }, [result]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editablePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave(editablePrompt);
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Generated Output</h2>
        <Button variant="ghost" onClick={onReset} className="text-xs">
          ← Start Over
        </Button>
      </div>

      <div className="bg-hex-card border border-hex-border rounded-lg overflow-hidden relative shadow-2xl">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-hex-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <span className="text-xs font-mono text-hex-muted ml-3">gemini-2.5-flash output</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`text-xs px-2 py-1 rounded transition-colors ${isEditing ? 'bg-hex-accent text-hex-bg' : 'text-hex-muted hover:text-white'}`}
            >
              {isEditing ? 'Done' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-0">
          {isEditing ? (
             <textarea 
              value={editablePrompt}
              onChange={(e) => setEditablePrompt(e.target.value)}
              className="w-full h-64 p-6 bg-[#0a0a0e] text-hex-text font-mono text-sm leading-relaxed focus:outline-none resize-none"
             />
          ) : (
            <div className="w-full min-h-[16rem] p-6 bg-[#0a0a0e] text-hex-text font-mono text-sm leading-relaxed whitespace-pre-wrap selection:bg-hex-accent/30">
              {editablePrompt}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-hex-border bg-hex-card flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="text-xs text-hex-muted hidden md:block">
            {editablePrompt.length} characters
           </div>
           
           <div className="flex w-full md:w-auto gap-3">
             <Button 
                variant="secondary" 
                onClick={handleSave} 
                className="flex-1 md:flex-none"
             >
                <span className="mr-2">♥</span> Save
             </Button>
             
             <Button 
                onClick={handleCopy} 
                className={`flex-1 md:flex-none min-w-[140px] transition-all duration-300 ${copied ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
             >
                {copied ? 'Copied!' : 'Copy Prompt'}
             </Button>
           </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
         <p className="text-hex-muted text-sm">
           Tip: Paste this directly into Midjourney (Discord) or Adobe Firefly.
         </p>
      </div>
    </div>
  );
};