import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
import './Alert.css'

interface Props {
  message: string
  variant?: 'success' | 'error'
  
}

export const Alert = ({ message, variant }: Props) => {
  return (
    <>
      <div className="alert">
        {variant === 'success' ? <AiOutlineCheckCircle color="green" size={'20px'}/> : <BiErrorAlt />}
        {message}
      </div>
    </>
  )
}
