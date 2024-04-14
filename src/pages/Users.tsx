import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar/Navbar"
import "./list.css"
import axios from "axios"
import { Modal } from "../components/Modal/Modal"
import { Formik, Field, Form } from "formik"
import { Alert } from "../components/Alert/Alert"

export interface Users {
  name: string
  username: string
  id: string
}

export const Users = () => {

  // Chamadas para a API ------------------------------------------------------------------------------------------------
  const getUsers = () => {
    setIsLoading(true)
    axios
      .get("https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/users")
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const deleteUser = (id: string) => {
    setIsLoading(true)
    axios
      .delete(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/users/${id}`)
      .then(() => {
        getUsers()
        setSuccessMessage("Funcionário deletado com sucesso")
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
        getUsers()
        setSuccessMessage("Funcionário criado com sucesso")
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const updateUser = (values: Users) => {
    setIsLoading(true)
    axios
      .put(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/users/${selectedUserID}`, values)
      .then(() => {
        setUsers(
          users.map((user) => {
            if (user.id === selectedUserID) {
              return {
                ...user,
                ...values,
              }
            }
            return user
          })
        )
        setSuccessMessage("Funcionário atualizado com sucesso")
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Chamadas para a API ------------------------------------------------------------------------------------------------

  const [isLoading, setIsLoading] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [users, setUsers] = useState<Users[]>([])
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState<Users>()
  const [selectedUserID, setSelectedUserID] = useState("")

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleDelete = (id: string) => {
    setIsDeleteModalOpen(false)
    deleteUser(id)
  }

  const handleOpenDeleteModal = (id: string) => {
    setSelectedUserID(id)
    setIsDeleteModalOpen(true)
  }

  const handleOpenUpdateModal = (user: Users) => {
    setSelectedUserID(user.id)
    setSelectedUser(user)
    setIsUpdateModalOpen(true)
  }

  return (
    <>
      {successMessage && <Alert message={successMessage} variant="success" />}
      <Modal isOpen={isCreateModalOpen}>
        <div>
          <h2>Criar funcionário</h2>
          <Formik
            initialValues={{
              name: "",
              username: "",
              id: "",
            }}
            onSubmit={(values) => {
              setIsCreateModalOpen(false)
              createUser(values)
            }}
          >
            <Form>
              <Field id="name" name="name" placeholder="Nome completo" />
              <Field id="username" name="username" placeholder="Nome de Usuário" type="text" />
              <div className="buttons-container">
                <button onClick={() => setIsCreateModalOpen(false)}>Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen}>
        <div>
          <p>Tem certeza que deseja excluir este funcionário?</p>
          <div className="buttons-container">
            <button onClick={() => setIsDeleteModalOpen(false)} className="item-button">
              Não
            </button>
            <button onClick={() => handleDelete(selectedUserID)} className="item-button">
              Sim
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isUpdateModalOpen}>
        <div>
          <h2>Editar usuário</h2>
          <Formik
            initialValues={{
              name: selectedUser?.name || "",
              username: selectedUser?.username || "",
              id: selectedUser?.id || "",
            }}
            onSubmit={(values) => {
              setIsUpdateModalOpen(false)
              updateUser(values)
            }}
          >
            <Form>
              <Field id="name" name="name" placeholder="Nome completo" />
              <Field id="username" name="username" placeholder="Nome de usuário" />
              <div className="buttons-container">
                <button onClick={() => setIsUpdateModalOpen(false)}>Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      <Modal isOpen={isLoading}>
        <div className="loading-icon"></div>
      </Modal>
      <Navbar />
      <div className="list-page">
        <div className="list-page-header">
          <h1>Usuários</h1>
          <button onClick={() => setIsCreateModalOpen(true)} className="add-button">
            Adicionar
          </button>
        </div>
        <div className="items">
          {users.map((user) => (
            <div key={user.id} className="item">
              <h2>{user.name}</h2>
              <p>{user.username}</p>
              <div className="buttons-container">
                <button onClick={() => handleOpenUpdateModal(user)} className="item-button">
                  Editar
                </button>
                <button onClick={() => handleOpenDeleteModal(user.id)} className="item-button">
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
