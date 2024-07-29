import { useNavigate } from 'react-router-dom'

import { nomesAlimentos } from '../types'

import { Formik, Field, Form } from "formik"

import * as Yup from 'yup'

const esquemaValidacao = Yup.object().shape({
  pessoas: Yup.number().min(1, "Quantidade de pessoas obrigatória"),
  selecaoAlimentos: Yup.array().of(Yup.string()).test("checkSelecaoAlimentos", "Selecione pelo menos um alimento", (array) => array !== null && array!.length > 0),
})

export default function CalculadoraChurrasco() {

  const navigate = useNavigate()

  return (
    <div>

      <Formik initialValues={{ pessoas: 0, selecaoAlimentos: [], }}
        validationSchema={esquemaValidacao}
        onSubmit={(values) => {
          navigate('/resultado', {
            state: {
              pessoas: values.pessoas,
              alimentosSelecionados: values.selecaoAlimentos, 
            }
          })
        }}>
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="pessoas">Número de pessoas:</label>
              <Field name="pessoas" type="number" />
              {errors.pessoas && touched.pessoas ? (
                <p>{errors.pessoas}</p>
              ) : null}
            </div>
            <p>Selecione os alimentos:</p>
            {Object.keys(nomesAlimentos).map((alimento) => (
              <div key={alimento}>
                <Field
                  type="checkbox"
                  name="selecaoAlimentos"
                  value={alimento}
                />
                <label htmlFor="selecaoAlimentos">{nomesAlimentos[alimento]}</label>
              </div>
            ))}
            {errors.selecaoAlimentos ? (
              <p>{errors.selecaoAlimentos}</p>
            ) : null}
            <p><button type="submit">Calcular</button></p>
          </Form>
        )}  
      </Formik>
    </div>
  )
}
