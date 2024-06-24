let renderCount = 0;

export default function Header() {
  renderCount++;
  
  return (
    <h3>renderizou {renderCount}</h3>
  )
}

