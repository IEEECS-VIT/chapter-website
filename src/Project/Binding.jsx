const Binding = () => {
  const loops = Array.from({ length: 24 });

  return (
  
    <div
      className="
        absolute left-1/2 -translate-x-1/2 -top-[2.5vh] h-[72px] w-[90vw] max-w-7xl z-50 pointer-events-none" aria-hidden="true"
    >
      <div className="absolute inset-0 px-5 flex items-center justify-between">
        {loops.map((_, i) => (
          <div
            key={i}
            className="relative w-4 h-[60px] flex items-center justify-center"
          >
            <div className="w-[2px] h-[60px] bg-neutral-900 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.35)]" />
            <div className="w-[6px]" />
            <div className="w-[2px] h-[60px] bg-neutral-900 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.35)]" />

            <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-4 h-[9px] bg-neutral-900 rounded-sm" />
            <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-4 h-[9px] bg-neutral-900 rounded-sm" />

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Binding;