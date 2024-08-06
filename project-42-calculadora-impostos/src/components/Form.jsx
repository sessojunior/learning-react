import { useFormik } from "formik"

function Error({ children }) {
  return (
    <p className='pt-2 text-red-500 text-sm'>{children}</p>
  )
}

export default function Form({ calculateTax }) {

  const formik = useFormik({
    initialValues: {
      name: "",
      age: 0,
      income: 0,
    },
    validate: (values) => { 
      const errors = {}

      if (!values.name) {
        errors.name = "Nome obrigatório"
      }

      if (!values.age) {
        errors.age = "Idade obrigatória"
      }

      if (!values.income) {
        errors.income = "Renda obrigatória"
      }   
      return errors
    },
    onSubmit: (values) => {
      calculateTax(values)
    },
  })

  return (
    <div className="w-full p-8 flex flex-col justify-center border border-gray-300 bg-slate-50 rounded">
      <form onSubmit={formik.handleSubmit}>
        <div className="pb-4">
          <label htmlFor="name" className="block pb-2">Nome</label>
          <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Digite o nome" className="w-full border border-gray-300 rounded px-3 py-2" />
          {formik.errors.name && <Error>{formik.errors.name}</Error>}
        </div>
        <div className="pb-4">
          <label htmlFor="age" className="block pb-2">Idade</label>
          <input type="number" min="0" max="150" id="age" name="age" onChange={formik.handleChange} value={formik.values.age} placeholder="Digite a idade" className="w-full border border-gray-300 rounded px-3 py-2" />
          {formik.errors.age && <Error>{formik.errors.age}</Error>}
        </div>
        <div className="pb-4">
          <label htmlFor="income" className="block pb-2">Renda</label>
          <input type="number" min="0" max="1000000" id="income" name="income" onChange={formik.handleChange} value={formik.values.income} placeholder="Digite a renda em reais" className="w-full border border-gray-300 rounded px-3 py-2" />
          {formik.errors.income && <Error>{formik.errors.income}</Error>}
        </div>
        <div>
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all">Calcular</button>
        </div>
      </form>
    </div>
  )
}
