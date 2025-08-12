const ProjectTabs = ({ activeIndex, onSelect, titles }) => {
  return (
    <div className="flex items-end mx-15 pb-2">
      {titles.map((title, idx) => {
        // Skip rendering tab for index 0
        if (idx === 0) return null;

        const isActive = idx === activeIndex;
        return (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`relative px-6 py-3 text-sm font-medium transition-all z-10 w-54 bg-[#f0ebe2] text-black shadow-md`}
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)",
              borderRadius: "0px 0 90px 15px",
            }}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectTabs;
