import { useState, useRef, useEffect } from 'react';

function TextInputForm({ text, setText, onClose }) {
  const inputRef = useRef(null);
  const [inputText, setInputText] = useState(text);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focar automaticamente no input quando o diálogo for aberto
    }
  }, []);

  const handleSave = () => {
    setText(inputText); // Sincroniza o texto do formulário com o estado no componente pai
    setInputText(''); // Limpar o input após salvar
    onClose(); // Fechar o diálogo após salvar
  };

  return (
    <dialog open style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <label>
        Digite o texto a ser inserido:
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </dialog>
  );
}

export default TextInputForm;
