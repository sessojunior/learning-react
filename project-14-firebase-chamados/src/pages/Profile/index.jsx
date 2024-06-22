import { FiSettings, FiUpload } from "react-icons/fi"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"

import imgAvatar from "../../assets/avatar.png"

import { toast } from "react-toastify"

import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../services/firebaseConnection"

export default function Profile() {

  const { user, setUser, saveUserInLocalStorage } = useContext(AuthContext)
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [avatarFile, setAvatarFile] = useState(imgAvatar)

  const [formUpdate, setFormUpdate] = useState({
    name: user && user.name,
    email: user && user.email,
    avatarUrl: user && user.avatarUrl,
  })

  async function saveAvatar(avatarFile) {
    const userUid = user.uid
    const uploadRef = ref(storage, `images/${userUid}/${avatarFile.name}`)
    await uploadBytes(uploadRef, avatarFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const docRef = doc(db, "users", userUid)
          await updateDoc(docRef, { avatarUrl: url })
            .then(() => {
              setUser({ ...user, avatarUrl: url })
              saveUserInLocalStorage({ ...user, avatarUrl: url })
              toast.success("Avatar atualizado com sucesso!")
            }).catch((error) => {
              toast.error("Erro ao atualizar o avatar")
              console.log("Erro ao atualizar o avatar", error)
            })
        })
      })
      .catch((error) => {
        console.log("Erro ao atualizar o avatar", error)
      })
  }

  async function handleSave(e) {
    e.preventDefault()

    if (formUpdate.name.length < 3) {
      toast.error("Nome precisa ter pelo menos 3 caracteres")
      return
    }

    if (avatarFile !== imgAvatar) {
      await saveAvatar(avatarFile)
    }

    const docRef = doc(db, "users", user.uid)
    await updateDoc(docRef, {
      name: formUpdate.name,
    })

    setUser({ ...user, name: formUpdate.name })
    saveUserInLocalStorage({ ...user, name: formUpdate.name })
    toast.success("Salvo com sucesso!")
  }

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        alert("Envie uma imagem do tipo PNG ou JPG")
        setAvatarFile(null)
        return
      }
      
      setAvatarFile(image)
      setAvatarUrl(URL.createObjectURL(image))
    }
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Topbar title="Minha conta"><FiSettings size={24} color="#666" /></Topbar>
        <div className="box">
          <form onSubmit={handleSave}>
            <div className="avatar">
              <img src={avatarUrl !== null ? avatarUrl : avatarFile} alt="Imagem de perfil" />
              <label htmlFor="file-avatar">
                <FiUpload size={32} color="#fff" className="icon" />
              </label>
              <input type="file" name="imgAvatar" id="file-avatar" accept="image/png, image/jpeg" onChange={handleFile} />
            </div>
            <div>
              <label htmlFor="name">Nome</label>
              <input type="text" name="name" id="name" value={formUpdate.name} onChange={(e) => setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value })} placeholder="Nome" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" value={formUpdate.email} onChange={(e) => setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value })} placeholder="E-mail" disabled />
            </div>
            <div>
              <button type="submit">Salvar alterações</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
