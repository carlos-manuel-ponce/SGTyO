import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
// ...existing code...
import NoteCard from './components/NoteCard'
import ProgressBar from './components/ProgressBar'

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', body: '', date: '' })
  const [notesList, setNotesList] = useState([])

  // Leer notas desde Supabase al montar el componente
  useEffect(() => {
    async function fetchNotes() {
      const { data, error } = await supabase
        .from('notas')
        .select('*');
      if (!error && Array.isArray(data)) {
        setNotesList(data);
      }
    }
    fetchNotes();
  }, []);
  // Cambiar el título de la pestaña del navegador
  if (typeof window !== 'undefined') {
    document.title = 'Sistema de Gestión de Tareas y Objetivos';
  }
  const [sala, setSala] = useState('')
  const [showDashboard, setShowDashboard] = useState(true)

  const salas = [
    { value: 'sistema_jcd', label: 'SISTEMA JCD' },
    { value: 'contratos', label: 'CONTRATOS' },
    { value: 'honorarios', label: 'HONORARIOS' },
    { value: 'llamados_abiertos', label: 'LLAMADOS ABIERTOS' },
    { value: 'llamados_regulares', label: 'LLAMADOS REGULARES' },
    { value: 'pedidos', label: 'PEDIDOS' }
  ]
  // ...existing code...

  const [editNoteIdx, setEditNoteIdx] = useState(null);
  const [editNote, setEditNote] = useState({ title: '', body: '', date: '', time: '' });
  return (
    <div className="min-h-dvh bg-white p-4 md:p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        <header className="fixed top-0 left-0 w-full z-10 text-center py-10 bg-gray-900 shadow-soft">
          <h1 className="text-4xl font-light text-white tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>Sistema de Gestión de Tareas y Objetivos</h1>
        </header>
        <div className="pt-24"></div>
        <main className="p-0">
          {showDashboard ? (
            <section className="mt-6 rounded-2xl p-6 bg-white">
              {/* Botón de nueva tarea eliminado del dashboard */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left ml-2">Mis salas</h2>
              {/* Ordenar salas por cantidad de tareas */}
              {(() => {
                // Contar tareas por sala
                const salaCounts = salas.map(s => ({
                  ...s,
                  count: notesList.filter(n => n.sala === s.value).length
                }))
                // Ordenar descendente por cantidad
                salaCounts.sort((a, b) => b.count - a.count)
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
                    {salaCounts.map((s, idx) => {
                      // Calcular porcentaje completado
                      const notasSala = notesList.filter(n => n.sala === s.value);
                      const total = notasSala.length;
                      const completadas = notasSala.filter(n => {
                        return /hecho|completado|finalizado|entregado/i.test(n.title) || /hecho|completado|finalizado|entregado/i.test(n.body) || n.color === 'bg-green-500';
                      }).length;
                      const porcentaje = total > 0 ? completadas / total : 0;
                      return (
                        <div
                          key={s.value}
                          className="p-10 flex flex-col items-center justify-center border border-gray-200 shadow-md cursor-pointer relative min-h-[170px] md:min-h-[200px] min-w-[220px] md:min-w-[260px]"
                          style={{
                            borderRadius: 0,
                            backgroundColor: '#1a202c',
                            transition: 'transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)',
                          }}
                          onClick={() => { setSala(s.value); setShowDashboard(false); }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(30,64,175,0.18)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(30,64,175,0.12)';
                          }}
                        >
                          {/* Corner letter label */}
                          <span className="absolute top-4 left-4 bg-yellow-400 text-black text-sm font-bold px-3 py-1 shadow" style={{borderRadius:0, letterSpacing: '1px', fontFamily:'sans-serif'}}>{String.fromCharCode(65 + idx)}</span>
                          <span className="font-semibold text-white text-xl mb-2 text-center" style={{fontFamily:'sans-serif', letterSpacing:'0.5px'}}>{s.label}</span>
                          <span className="text-sm text-white bg-transparent px-3 py-1 mb-2 text-center" style={{borderRadius:0, fontFamily:'sans-serif'}}>{s.count} tareas</span>
                          <div className="mt-6 flex justify-center w-full">
                            <ProgressBar value={notasSala} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              })()}
            </section>
          ) : (
            <section className="mt-8">
              <div className="flex items-center mb-8">
                <button
                  className="mr-4 bg-gray-900 text-white shadow-lg font-bold text-2xl flex items-center justify-center w-12 h-12 border-0"
                  style={{ borderRadius: '50%', fontFamily: 'sans-serif', minWidth: '48px', minHeight: '48px', boxShadow: '0 4px 16px 0 rgba(30,64,175,0.12)' }}
                  onClick={() => { setShowDashboard(true); setSala(''); }}
                  aria-label="Volver al inicio"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="14" fill="#1a202c" />
                    <path d="M17 8L11 14L17 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="flex-1">
                  {/* ...existing code... */}
                </div>
                <button
                  className="text-white px-4 py-2 font-semibold shadow card hover:scale-105 transition-transform border-0"
                  style={{borderRadius:'0.75rem', fontFamily:'sans-serif', backgroundColor:'#1a202c'}}
                  onClick={() => setShowForm(true)}
                >
                  + Agregar tarea
                </button>
              </div>
              {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 card w-full max-w-md relative">
                    <button
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                      onClick={() => setShowForm(false)}
                      aria-label="Cerrar"
                    >×</button>
                    <form onSubmit={e => {
                      e.preventDefault();
                      if (!newNote.title) return;
                      let color = 'bg-red-500';
                      if (/hecho|completado|finalizado|entregado/i.test(newNote.title) || /hecho|completado|finalizado|entregado/i.test(newNote.body)) {
                        color = 'bg-green-500';
                      }
                      setNotesList([...notesList, {
                        title: newNote.title,
                        body: newNote.body,
                        date: newNote.date,
                        color,
                        sala: sala
                      }]);
                      setNewNote({ title: '', body: '', date: '' });
                      setShowForm(false);
                    }}>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Agregar nueva nota</h3>
                      <div className="mb-3">
                        <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Título" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} required />
                      </div>
                      <div className="mb-3">
                        <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Descripción" value={newNote.body} onChange={e => setNewNote({ ...newNote, body: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <input type="date" className="border rounded-lg px-3 py-2" value={newNote.date} onChange={e => setNewNote({ ...newNote, date: e.target.value })} />
                      </div>
                      <button type="submit" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold">Agregar nota</button>
                    </form>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {notesList.filter(n => sala === '' || n.sala === sala).map((n, i) => {
                  // Solo rojo y verde
                  let color = 'bg-red-500';
                  if (/hecho|completado|finalizado|entregado/i.test(n.title) || /hecho|completado|finalizado|entregado/i.test(n.body)) {
                    color = 'bg-green-500';
                  }
                  return (
                    <div key={i} onClick={() => {
                      setEditNoteIdx(i);
                      setEditNote({ ...n });
                    }} style={{ cursor: 'pointer' }}>
                      <NoteCard {...n} color={color} />
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </main>
        {/* MODAL DE EDICIÓN DE NOTA */}
        {editNoteIdx !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 card w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setEditNoteIdx(null)}
                aria-label="Cerrar"
              >×</button>
              <form onSubmit={e => {
                e.preventDefault();
                // Actualizar nota y color (solo rojo y verde)
                const updatedNotes = [...notesList];
                let color = 'bg-red-500';
                if (/hecho|completado|finalizado|entregado/i.test(editNote.title) || /hecho|completado|finalizado|entregado/i.test(editNote.body)) {
                  color = 'bg-green-500';
                }
                updatedNotes[editNoteIdx] = {
                  ...updatedNotes[editNoteIdx],
                  title: editNote.title,
                  body: editNote.body,
                  date: editNote.date,
                  time: editNote.time,
                  color
                };
                setNotesList(updatedNotes);
                setEditNoteIdx(null);
              }}>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Editar nota</h3>
                <div className="mb-3">
                  <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Título" value={editNote.title} onChange={e => setEditNote({ ...editNote, title: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Descripción" value={editNote.body} onChange={e => setEditNote({ ...editNote, body: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="date" className="border rounded-lg px-3 py-2" value={editNote.date} onChange={e => setEditNote({ ...editNote, date: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" className="border rounded-lg px-3 py-2" placeholder="Hora y día" value={editNote.time} onChange={e => setEditNote({ ...editNote, time: e.target.value })} />
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">Guardar cambios</button>
                  <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => {
                    // Marcar como completada (solo verde)
                    const updatedNotes = [...notesList];
                    updatedNotes[editNoteIdx] = {
                      ...updatedNotes[editNoteIdx],
                      color: 'bg-green-500'
                    };
                    setNotesList(updatedNotes);
                    setEditNoteIdx(null);
                  }}>Marcar como completada</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
