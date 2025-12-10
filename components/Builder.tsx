import React, { useState } from 'react';
import { Button } from './ui/Button';
import { UserPreferences, IMAGE_TYPES, STYLE_PRESETS, ASPECT_RATIOS } from '../types';

interface BuilderProps {
  onGenerate: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

export const Builder: React.FC<BuilderProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<UserPreferences>({
    imageType: 'Photorealistic',
    subject: '',
    style: 'Minimalist',
    mood: '',
    lighting: 'Soft natural light',
    colors: '',
    aspectRatio: '16:9'
  });

  const handleChange = (field: keyof UserPreferences, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isFormValid = formData.subject.trim().length > 3;

  return (
    <div className="animate-fade-in w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Configure Prompt</h2>
        <p className="text-hex-muted">Define the parameters for your visual generation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Core Content */}
        <div className="p-6 md:p-8 rounded-lg border border-hex-border bg-hex-card shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-hex-muted uppercase tracking-wider">Image Type</label>
              <div className="flex flex-wrap gap-2">
                {IMAGE_TYPES.slice(0, 6).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('imageType', type)}
                    className={`px-3 py-1.5 text-sm rounded border transition-all ${
                      formData.imageType === type 
                        ? 'bg-hex-accent text-hex-bg border-hex-accent font-bold' 
                        : 'bg-transparent border-hex-border text-hex-text hover:border-hex-muted'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
               <label className="block text-sm font-medium text-hex-muted uppercase tracking-wider">Aspect Ratio</label>
               <select 
                value={formData.aspectRatio}
                onChange={(e) => handleChange('aspectRatio', e.target.value)}
                className="w-full bg-hex-bg border border-hex-border rounded px-4 py-3 text-hex-text focus:border-hex-accent focus:outline-none"
               >
                 {ASPECT_RATIOS.map(ratio => (
                   <option key={ratio} value={ratio}>{ratio}</option>
                 ))}
               </select>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-hex-muted uppercase tracking-wider">
              Subject <span className="text-hex-accent">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="e.g. A futuristic glass house in a rainforest, geometric shapes, morning mist"
              className="w-full bg-hex-bg border border-hex-border rounded p-4 text-white placeholder-hex-muted/50 focus:border-hex-accent focus:ring-1 focus:ring-hex-accent focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Section 2: Aesthetics */}
        <div className="p-6 md:p-8 rounded-lg border border-hex-border bg-hex-card shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-white border-b border-hex-border pb-2">Visual Style</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-3">
              <label className="block text-xs font-mono text-hex-muted">ART STYLE</label>
              <select 
                value={formData.style}
                onChange={(e) => handleChange('style', e.target.value)}
                className="w-full bg-hex-bg border border-hex-border rounded px-3 py-2 text-sm focus:border-hex-accent outline-none"
              >
                {STYLE_PRESETS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono text-hex-muted">LIGHTING</label>
              <input 
                type="text" 
                value={formData.lighting}
                onChange={(e) => handleChange('lighting', e.target.value)}
                placeholder="e.g. Cinematic, Volumetric, Neon"
                className="w-full bg-hex-bg border border-hex-border rounded px-3 py-2 text-sm focus:border-hex-accent outline-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono text-hex-muted">MOOD</label>
              <input 
                type="text" 
                value={formData.mood}
                onChange={(e) => handleChange('mood', e.target.value)}
                placeholder="e.g. Melancholic, Energetic, Serene"
                className="w-full bg-hex-bg border border-hex-border rounded px-3 py-2 text-sm focus:border-hex-accent outline-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono text-hex-muted">COLOR PALETTE</label>
              <input 
                type="text" 
                value={formData.colors}
                onChange={(e) => handleChange('colors', e.target.value)}
                placeholder="e.g. Pastel pinks and blues, High contrast B&W"
                className="w-full bg-hex-bg border border-hex-border rounded px-3 py-2 text-sm focus:border-hex-accent outline-none"
              />
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            isLoading={isLoading} 
            disabled={!isFormValid}
            className="w-full md:w-auto min-w-[200px]"
          >
            Generate Prompt
          </Button>
        </div>
      </form>
    </div>
  );
};