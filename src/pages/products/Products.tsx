import { useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import "./Products.css"
import axios from "axios"
import { Modal } from "../../components/Modal/Modal"
import { Formik, Field, Form } from "formik"

export const Products = () => {
  interface Products {
    id: string
    name: string
    description: string
    price: string
    category: string
  }

  // Chamadas para a API ------------------------------------------------------------------------------------------------
  const getProducts = () => {
    setIsLoading(true)
    axios
      .get("https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/products")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const deleteProduct = (id: string) => {
    setIsLoading(true)
    axios
      .delete(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id))
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const createProduct = (values: Products) => {
    setIsLoading(true)
    axios
      .post(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/products`, values)
      .then(() => {
        getProducts()
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const updateProduct = (values: Products) => {
    setIsLoading(true)
    axios
      .put(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/products/${selectedProductID}`, values)
      .then(() => {
        setProducts(
          products.map((product) => {
            if (product.id === selectedProductID) {
              return {
                ...product,
                ...values,
              }
            }
            return product
          })
        )
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

  const [products, setProducts] = useState<Products[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Products>()
  const [selectedProductID, setSelectedProductID] = useState("")

  useEffect(() => {
    getProducts()
  }, [])

  const handleDelete = (id: string) => {
    setIsDeleteModalOpen(false)
    deleteProduct(id)
  }

  const handleOpenDeleteModal = (id: string) => {
    setSelectedProductID(id)
    setIsDeleteModalOpen(true)
  }

  const handleOpenUpdateModal = (product: Products) => {
    setSelectedProductID(product.id)
    setSelectedProduct(product)
    setIsUpdateModalOpen(true)
  }

  return (
    <>
      <Modal isOpen={isCreateModalOpen}>
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
              setIsCreateModalOpen(false)
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
              </Field>
              <div className="buttons-container">
                <button onClick={() => setIsUpdateModalOpen(false)}>Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen}>
        <div>
          <p>Tem certeza que deseja excluir este produto?</p>
          <div className="buttons-container">
            <button onClick={() => setIsDeleteModalOpen(false)} className="item-button">
              Não
            </button>
            <button onClick={() => handleDelete(selectedProductID)} className="item-button">
              Sim
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isUpdateModalOpen}>
        <div>
          <h2>Editar produto</h2>
          <Formik
            initialValues={{
              name: selectedProduct?.name || "",
              description: selectedProduct?.description || "",
              price: selectedProduct?.price || "",
              id: selectedProduct?.id || "",
              category: selectedProduct?.category || "",
            }}
            onSubmit={(values) => {
              setIsUpdateModalOpen(false)
              updateProduct(values)
            }}
          >
            <Form>
              <Field id="name" name="name" placeholder="Nome" />
              <Field id="description" name="description" placeholder="Descrição" />
              <Field id="price" name="price" placeholder="Preço" type="text" />
              <Field id="category" name="category" placeholder="Categoria" type="text" />
              <div className="buttons-container">
                <button type="submit">Salvar</button>
                <button onClick={() => setIsUpdateModalOpen(false)}>Cancelar</button>
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
          <h1>Produtos</h1>
          <button onClick={() => setIsCreateModalOpen(true)} className="add-button">
            Adicionar
          </button>
        </div>
        <div className="items">
          {products.map((product) => (
            <div key={product.id} className="item">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.category}</p>
              <div className="buttons-container">
                <button onClick={() => handleOpenUpdateModal(product)} className="item-button">
                  Editar
                </button>
                <button onClick={() => handleOpenDeleteModal(product.id)} className="item-button">
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
