import React from 'react';

export default function ProgressBar({ value }) {
  // value: array de notas de la sala
  const notas = value;
  const total = notas.length;
  if (total === 0) {
    return (
      <div className="w-5/6 flex flex-col items-center mt-6">
        <div className="w-full h-3 bg-gray-300 rounded-full mb-2"></div>
        <span className="text-xs font-semibold text-gray-700">0%</span>
      </div>
    );
  }
  // Determinar colores por nota
  const colores = notas.map(n => {
    if (/hecho|completado|finalizado|entregado/i.test(n.title) || /hecho|completado|finalizado|entregado/i.test(n.body) || n.color === 'bg-green-500') {
      return '#22c55e'; // verde
    } else if (/delegado|nota/i.test(n.title) || /delegado|nota/i.test(n.body) || n.color === 'bg-orange-400') {
      return '#f59e42'; // naranja
    } else {
      return '#ef4444'; // rojo
    }
  });
  // Calcular porcentaje completadas
  const completadas = colores.filter(c => c === '#22c55e').length;
  const porcentaje = Math.round((completadas / total) * 100);
  // Renderizar barra segmentada
  return (
    <div className="w-5/6 flex flex-col items-center mt-6">
      <div className="w-full h-3 rounded-full flex overflow-hidden mb-2" style={{background:'#e5e7eb'}}>
        {colores.map((color, i) => (
          <div key={i} style={{background:color, width:`${100/total}%`, height:'100%'}}></div>
        ))}
      </div>
      <span className="text-xs font-semibold text-gray-700">{porcentaje}%</span>
    </div>
  );
}
