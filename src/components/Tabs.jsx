export default function Tabs({ value, onChange, items }) {
  return (
    <div className="flex items-center gap-2">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={`tab ${value === it.value ? 'tab-active' : ''}`}
          title={it.label}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}
