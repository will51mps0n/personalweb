const AvailabilityBadge = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <aside
      className="availability-badge fixed left-5 md:left-6 bottom-5 md:bottom-6 z-[60] text-[12px] md:text-[13px] text-[color:rgba(47,54,66,0.82)] opacity-80 hover:opacity-100 transition select-none"
    >
      <div>University of Michigan CSE 2025</div>
      <div>Available for work</div>
      <a
        href="mailto:adwisi@umich.edu"
        className="no-underline text-[color:rgba(47,54,66,0.82)] hover:text-[color:var(--color-white-50)]"
      >
        adwisi@umich.edu
      </a>
    </aside>
  );
};

export default AvailabilityBadge;
