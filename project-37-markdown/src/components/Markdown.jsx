import Toolbar from "./Toolbar";
import { useEffect, useRef, useState } from "react"
import { marked } from "marked"

export default function Markdown() {
    
  const [text, setText] = useState(localStorage.getItem("text") || "")
  const textareaRef = useRef(null)

  const renderText = (text) => {
    return { __html: marked(text) }
  }

  const insertText = (before, after) => {
    console.log("before, after", before, after)
    const textarea = textareaRef.current
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const previousText = textarea.value
    const beforeText = previousText.substring(0, start)
    const selectText = previousText.substring(start, end)
    const afterText = previousText.substring(end)

    const newText = `${beforeText}${before}${selectText}${after}${afterText}`


    // console.log(newText)
    setText(newText)
    textarea.focus()
  }

  useEffect(() => {
    localStorage.setItem("text", text)
  }, [text])

  return (
    <div className="flex flex-col w-full px-16">
      <Toolbar insertText={insertText} />
      <div className="flex pb-4 w-full">
        <textarea name="description" ref={textareaRef} placeholder="# Digite aqui seu texto em markdown..." value={text} onChange={(e) => setText(e.target.value)} className="w-full h-60 border border-gray-300 rounded p-2"></textarea>
      </div>
      <h2 className="text-2xl font-medium">Resultado:</h2>
      <div className="pt-4">
        <div dangerouslySetInnerHTML={renderText(text)}></div>
      </div>
    </div>
  )
}
