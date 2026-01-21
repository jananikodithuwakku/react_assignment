const points = [
  { id: 1, x: 60, y: 60 },
  { id: 2, x: 150, y: 60 },
  { id: 3, x: 240, y: 60 },

  { id: 4, x: 60, y: 150 },
  { id: 5, x: 150, y: 150 },
  { id: 6, x: 240, y: 150 },

  { id: 7, x: 60, y: 240 },
  { id: 8, x: 150, y: 240 },
  { id: 9, x: 240, y: 240 }
];

export default function Assignment_47() {
  return (
    <svg width="300" height="300">
      {points.map(p => (
        <circle key={p.id} cx={p.x} cy={p.y} r="6" fill="black"/>
      ))}
    </svg>
  );
}
