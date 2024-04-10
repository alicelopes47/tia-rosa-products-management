import { Field, Form, Formik } from "formik"
import { Modal } from "./Modal/Modal"
import axios from "axios"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const CreateProductModal = ({ isOpen, onClose }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal isOpen={isOpen}>
      <div>
        <h2>Criar produto</h2>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
          }}
          onSubmit={(values) => {
            setIsSubmitting(true);
            axios.post(`https://6615ce7fb8b8e32ffc7bc284.mockapi.io/tiarosacoffeeshop/products`, values)
              .then(() => {
                setIsSubmitting(false);
                onClose();
              })
              .catch((error) => {
                setIsSubmitting(false);
                console.error("There was an error!", error)
              })
          }}
        >
          <Form>
            <Field id="name" name="name" placeholder="Nome" />
            <Field id="description" name="description" placeholder="Descrição" />
            <Field id="price" name="price" placeholder="Preço" type="text" />
            <div className="buttons-container">
              <button type="submit" disabled={isSubmitting}>Salvar</button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}