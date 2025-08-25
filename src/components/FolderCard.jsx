export default function FolderCard({ title, date, color='bg-blue-100', icon='📄' }) {
  return (
    <div className={`rounded-2xl p-5 shadow-soft border border-gray-100 ${color}`}>
      <div className="flex items-center justify-between mb-10">
        <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center text-2xl">{icon}</div>
        <button className="p-1 rounded hover:bg-white/60" title="Opciones">
          <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v.01M12 12v.01M12 18v.01'/></svg>
        </button>
      </div>
      <div className="space-y-1">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>
    </div>
  )
}
