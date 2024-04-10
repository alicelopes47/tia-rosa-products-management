import { Card } from "../components/Card/Card"
import Logo from "../assets/logo.png"
import "./Home.css"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="home-content">
        <img src={Logo} alt="Logo da empresa" width="150px" />
        <h1>Bem vindo Admin!</h1>
        <div className="cards-container">
          <Card label="Produtos" onClick={() => navigate("/products")} />
          <Card label="Cadastrar Produtos" onClick={() => console.log("Clicou em Meu Perfil")} />
          <Card label="Funcionários" onClick={() => console.log("Clicou em Meu Perfil")} />
          <Card label="Cadastrar Funcionários" onClick={() => console.log("Clicou em Meu Perfil")} />
        </div>
      </div>
    </>
  )
}
