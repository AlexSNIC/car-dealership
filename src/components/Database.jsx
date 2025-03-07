export default function Database({name, databaseElements}) {
  return (
    <div className="database">
      <div className="database__title">{name}</div>
      {databaseElements}
      
    </div>
  )
}