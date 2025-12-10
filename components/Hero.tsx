import React from 'react';
import { Button } from './ui/Button';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-16 animate-fade-in-up">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-hex-accent bg-hex-accent/10 border border-hex-accent/20 rounded-full">
        v1.0.0 Public Preview
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
        Design logic to <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-hex-accent to-pink-500">
          visual magic.
        </span>
      </h1>
      
      <p className="max-w-xl text-lg text-hex-muted mb-10 leading-relaxed">
        Stop wrestling with generic prompts. Lumina translates your creative vision into highly technical, structured prompts for Midjourney, Firefly, and Kling.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onStart} className="min-w-[180px] h-12 text-base">
          Start Generating
        </Button>
        <Button variant="secondary" className="min-w-[180px] h-12 text-base" onClick={() => window.open('https://midjourney.com', '_blank')}>
          Explore Gallery
        </Button>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full">
        {[
          { title: "Structured Input", desc: "No more guessing keywords. Input your intent, get engineering-grade prompts." },
          { title: "Style Agnostic", desc: "From photorealistic 85mm portraits to isometric 3D renders." },
          { title: "Iterative Control", desc: "Generate, refine manually, and save your favorites for later." }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded border border-hex-border bg-hex-card/50 hover:border-hex-accent/30 transition-colors">
            <h3 className="font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-hex-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};