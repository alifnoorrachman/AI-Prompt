import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  headerAction?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, headerAction }) => {
  return (
    <div className="min-h-screen bg-hex-bg text-hex-text selection:bg-hex-accent selection:text-hex-bg font-sans overflow-x-hidden relative">
      {/* Background Grid System - Subtle Technical Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2E2E38 1px, transparent 1px),
            linear-gradient(to bottom, #2E2E38 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial Glow for depth */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-hex-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Navigation / Header */}
      <nav className="relative z-50 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 bg-gradient-to-br from-hex-accent to-pink-600 rounded flex items-center justify-center font-bold text-hex-bg font-mono">
            L
          </div>
          <span className="font-bold text-xl tracking-tight">Lumina</span>
        </div>
        <div>
          {headerAction}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20 mt-8">
        {children}
      </main>
    </div>
  );
};