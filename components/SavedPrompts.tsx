import React from 'react';
import { SavedPrompt } from '../types';

interface SavedPromptsProps {
  prompts: SavedPrompt[];
  onSelect: (prompt: SavedPrompt) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const SavedPrompts: React.FC<SavedPromptsProps> = ({ prompts, onSelect, onDelete, onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-[#111116] border-l border-hex-border shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto">
      <div className="p-6 border-b border-hex-border flex justify-between items-center sticky top-0 bg-[#111116] z-10">
        <h3 className="font-bold text-lg">Saved Prompts ({prompts.length})</h3>
        <button onClick={onClose} className="text-hex-muted hover:text-white p-2">✕</button>
      </div>

      <div className="p-4 space-y-4">
        {prompts.length === 0 ? (
          <div className="text-center py-10 text-hex-muted">
            <p>No saved prompts yet.</p>
          </div>
        ) : (
          prompts.map((item) => (
            <div key={item.id} className="p-4 rounded border border-hex-border bg-[#1A1A22] group hover:border-hex-accent/30 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-hex-accent uppercase tracking-wider">
                  {item.originalInput.imageType}
                </span>
                <span className="text-[10px] text-hex-muted font-mono">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-hex-text line-clamp-3 font-mono mb-3 text-gray-300">
                {item.finalPrompt}
              </p>
              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onDelete(item.id)}
                  className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
                >
                  Delete
                </button>
                <button 
                  onClick={() => onSelect(item)}
                  className="text-xs bg-hex-border hover:bg-hex-border/80 px-3 py-1 rounded"
                >
                  Load
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};