export default function Sidebar() {
  const items = [
    { label: 'Agregar nuevo', dots: ['#ef4444', '#22c55e', '#3b82f6'] },
    { label: 'Calendario' },
    { label: 'Archivo' },
    { label: 'Papelera' },
  ]
  return (
    <aside className="w-64 p-6 pr-4 hidden md:block">
      {/* Sidebar limpio, sin bloques ni textos innecesarios */}
    </aside>
  )
}
