import { useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.png"
import "./Navbar.css"

// TODO: rosinha fofo: #ff8c9d, bege: ffffed, azul: #8be4f9

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={Logo} alt="Logo da empresa" width="100px" />
        <ul className="navbar-list">
          <li className="navbar-item" onClick={() => navigate('/products')}>Produtos</li>
          <li className="navbar-item" onClick={() => navigate('/users')}>Funcionários</li>
          <li className="navbar-item" onClick={() => navigate('/home')}>Home</li>
        </ul>
      </div>
    </nav>
  )
}
