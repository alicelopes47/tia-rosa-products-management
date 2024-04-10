import { FormInput } from "../components/FormInput/FormInput"
import Logo from "../assets/logo.png"
import { useEffect, useState } from "react"
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
    <>
      <img src={Logo} alt="Logo da Alura" width="150px" />
      <form>
        <h1>Login</h1>
        <FormInput width="20%" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUser(event.target.value)} type="text" placeholder="Usuário" />
        <FormInput width="20%" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} type="password" placeholder="Senha" />
        <button disabled={disabled} style={{width: "20%"}} onClick={() => navigate('/home')}>
          Entrar
        </button>
      </form>
    </>
  )
}
