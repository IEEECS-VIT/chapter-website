import React from 'react';

const Binding2 = () => {
  const loops = Array.from({ length: 24 });

  return (
    <div className="absolute top-1/2 -translate-y-1/2 -left-12 h-[70vh] max-h-7xl w-[72px] z-50 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 py-5 flex flex-col items-center justify-between">
        {loops.map((_, i) => (
          <div key={i} className="relative h-4 w-[60px] flex items-center justify-center">
            <div className="w-[60px] h-[2px] bg-neutral-900 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.35)]" />
            <div className="h-[6px]" />
            <div className="w-[60px] h-[2px] bg-neutral-900 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.35)]" />

            <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[9px] h-4 bg-neutral-900 rounded-sm" />
            <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[9px] h-4 bg-neutral-900 rounded-sm" />

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Binding2;