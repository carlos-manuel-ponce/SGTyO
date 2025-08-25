export default function NoteCard({ title, body, date, time, color='bg-yellow-200' }) {
  return (
    <article className={`note-card ${color}`}>
      <div className="text-xs text-gray-700 mb-2">{date}</div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <button className="p-1 rounded-lg hover:bg-white/30" title="Opciones">
          <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 6h18M3 12h18M3 18h18'/></svg>
        </button>
      </div>
      <p className="text-sm leading-relaxed text-gray-800/90 line-clamp-4">{body}</p>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>
        <span>{time}</span>
      </div>
    </article>
  )
}
