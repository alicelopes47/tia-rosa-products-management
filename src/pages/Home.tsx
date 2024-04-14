import { Card } from "../components/Card/Card"
import Logo from "../assets/logo.png"
import "./Home.css"
import { useNavigate } from "react-router-dom"
import { Products } from "./Products"
import axios from "axios"
import { useState } from "react"
import { Modal } from "../components/Modal/Modal"
import { Field, Formik, Form } from "formik"
import { Alert } from "../components/Alert/Alert"
import { Users } from "./Users"

export const Home = () => {
  const navigate = useNavigate()
  const createProduct = (values: Products) => {
    setIsLoading(true)
    axios
      .post(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/products`, values)
      .then(() => {
        setSuccessMessage("Produto criado com sucesso")
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const createUser = (values: Users) => {
    setIsLoading(true)
    axios
      .post(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/users`, values)
      .then(() => {
        setSuccessMessage("Funcionário criado com sucesso")
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isCreateProduct, setIsCreateProduct] = useState(false)
  const [isCreateUser, setIsCreateUser] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  return (
    <>
      <Modal isOpen={isLoading}>
        <div className="loading-icon"></div>
      </Modal>
      <Modal isOpen={isCreateProduct}>
        <div>
          <h2>Criar produto</h2>
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              id: "",
              category: "",
            }}
            onSubmit={(values) => {
              setIsCreateProduct(false)
              createProduct(values)
            }}
          >
            <Form>
              <Field id="name" name="name" placeholder="Nome" />
              <Field id="description" name="description" placeholder="Descrição" />
              <Field id="price" name="price" placeholder="Preço" type="text" />
              <Field as="select" name="category">
                <option value="">Selecione...</option>
                <option value="Bebidas Quentes">Bebidas Quentes</option>
                <option value="Bebidas Frias">Bebidas Frias</option>
                <option value="Sobremesas">Sobremesas</option>
                <option value="Comidas quentes">Comidas quentes</option>
              </Field>
              <div className="buttons-container">
                <button onClick={() => setIsCreateProduct(false)}>Cancelar</button>
                <button type="submit" >Salvar</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      <Modal isOpen={isCreateUser}>
        <div>
          <h2>Criar funcionário</h2>
          <Formik
            initialValues={{
              name: "",
              username: "",
              id: "",
            }}
            onSubmit={(values) => {
              setIsCreateUser(false)
              createUser(values)
            }}
          >
            <Form>
              <Field id="name" name="name" placeholder="Nome completo" />
              <Field id="username" name="username" placeholder="Nome de usuário" />
              <div className="buttons-container">
                <button onClick={() => setIsCreateUser(false)}>Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      {successMessage && <Alert message={successMessage} variant="success" />}
      <div className="home-content">
        <img src={Logo} alt="Logo da empresa" width="150px" />
        <h1>Bem vindo Admin!</h1>
        <div className="cards-container">
          <Card label="Produtos" onClick={() => navigate("/products")} />
          <Card label="Cadastrar Produtos" onClick={() => setIsCreateProduct(true)} />
          <Card label="Funcionários" onClick={() => navigate("/users")} />
          <Card label="Cadastrar Funcionários" onClick={() => setIsCreateUser(true)} />
        </div>
      </div>
    </>
  )
}
