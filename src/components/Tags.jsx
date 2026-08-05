export default function Tags({ items, size = 'sm' }) {
  return (
    <ul className={'tags tags-' + size}>
      {items.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
    </ul>
  )
}
