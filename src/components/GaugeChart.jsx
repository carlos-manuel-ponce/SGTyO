import React from 'react';

export default function GaugeChart({ value }) {
  // value: porcentaje completado (0 a 1)
  const angle = value * 180; // 0-180 grados
  const radius = 40;
  const center = 50;
  const startX = center - radius;
  const startY = center;
  const endX = center + radius * Math.cos(Math.PI * value);
  const endY = center - radius * Math.sin(Math.PI * value);
  return (
    <svg width={100} height={60} viewBox="0 0 100 60">
      {/* Semicírculo fondo */}
      <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#e5e7eb" strokeWidth={8} />
      {/* Aguja */}
      <line x1={center} y1={center} x2={endX} y2={endY} stroke="#2563eb" strokeWidth={5} />
      {/* Centro */}
      <circle cx={center} cy={center} r={6} fill="#2563eb" />
      {/* Texto porcentaje */}
      <text x={center} y={55} textAnchor="middle" fontSize={16} fill="#374151" fontWeight="bold">{Math.round(value * 100)}%</text>
    </svg>
  );
}
