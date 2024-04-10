import "./Card.css"

interface CardProps {
  label: string
  onClick: () => void
}

export const Card = ({ label, onClick }: CardProps) => {
  return (
    <div className="card-container" onClick={onClick}>
      <p>{label}</p>
    </div>
  )
}
