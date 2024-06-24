import { useForm } from 'react-hook-form'

export default function ReactHookForm() {
  const { register, handleSubmit } = useForm()

  function handleSave(data){
    console.log(data)
    // console.log(data.name)


  }
  
  return (
    <>
      <h2>Formulário usando React Hook Form</h2>
      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <input
          type="text"
          placeholder="Digite seu nome..."
          className="input"
          {...register('name', {
            required: true })}
        />

        <input
          type="text"
          placeholder="Digite seu email..."
          className="input"
          {...register('email', {
            required: true
          })}
        />

        <input
          type="text"
          placeholder="Digite seu username..."
          className="input"
          {...register('username', {
            required: true
          })}
        />

        <textarea
          type="text"
          placeholder="Digite sua descriçao..."
          className="input"
          {...register('description')}
        ></textarea>


        <select  
          className="select"
          {...register('type')}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button className="button" type="submit">Enviar</button>
      </form>
    </>
  )
}
