import { FormInput } from "../components/FormInput/FormInput"
import Logo from "../assets/logo.png"
import { useEffect, useState } from "react"
import './Login.css'
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    if (user && password) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user, password])
  return (
    <div className="login">
      <img src={Logo} alt="Logo da Alura" width="150px" />
      <form>
        <h1>Login</h1>
        <FormInput extraClass="input-login" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUser(event.target.value)} type="text" placeholder="Usuário" />
        <FormInput extraClass="input-login" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} type="password" placeholder="Senha" />
        <button disabled={disabled} className="login-button" onClick={() => navigate('/home')}>
          Entrar
        </button>
      </form>
    </div>
  )
}
