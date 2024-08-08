import "./App.css"
import Carousel from "./components/Carousel"

export default function App() {

  const imageUrls = [
    "https://s2-techtudo.glbimg.com/JsE244mucjKWLYtNgeiDyfVYlJQ=/0x129:1024x952/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/7/i/ME2AxRRoygUyFPCDe0jQ/3.png",
    "https://s2-techtudo.glbimg.com/FTgvUK9Iy7sDaluUiNI2rZ_-rGg=/1024x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/X/F/J0mHu4QN2Pe2spqsY2sA/8.jpg",
    "https://s2-techtudo.glbimg.com/ODFKc2p60yI68bkjj-4fHnv3_Ic=/1024x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/K/r/39nEFOTPKX4C7m5Y3sdA/5.jpg",
  ]

  return (
    <div className="App">
      <h1>Carousel</h1>
      <Carousel images={imageUrls} />
    </div>
  )
}
