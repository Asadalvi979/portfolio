const icons = [
  { name: "HTML", emoji: "🟠", x: 80, y: 20, duration: 9 },
  { name: "CSS", emoji: "🔵", x: 70, y: 60, duration: 10 },
  { name: "JavaScript", emoji: "🟡", x: 20, y: 30, duration: 11 },
  { name: "Bootstrap", emoji: "🟣", x: 85, y: 40, duration: 12 },
  { name: "Django", emoji: "🟢", x: 15, y: 70, duration: 11 },
  { name: "PHP", emoji: "🔮", x: 30, y: 15, duration: 10 },
  { name: "MySQL", emoji: "🔷", x: 10, y: 55, duration: 9 },
  { name: "C++", emoji: "💠", x: 60, y: 10, duration: 12 },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, i) => (
        <div
          key={i}
          className="floating-icon absolute text-2xl md:text-3xl opacity-20"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animationDuration: `${icon.duration}s`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <span title={icon.name}>{icon.emoji}</span>
        </div>
      ))}
    </div>
  );
}