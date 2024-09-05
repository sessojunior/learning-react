import { useState, useRef, useEffect } from 'react';

export default function DrawImage() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [allDrawings, setAllDrawings] = useState([]); // Armazena todos os desenhos
  const [historyDrawings, setHistoryDrawings] = useState([]); // Histórico dos desenhos
  const [redoDrawings, setRedoDrawings] = useState([]); // Histórico para refazer
  const [mode, setMode] = useState('draw'); // Modo de desenho ou escrita
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  
  const inputRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [text, setText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  // Função para ajustar o tamanho do canvas para corresponder ao tamanho da imagem
  const adjustCanvasSize = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;

    if (canvas && img) {
      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;

      // Redesenhar todos os desenhos após o redimensionamento
      redrawAllDrawings();
    }
  };

  const redrawAllDrawings = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    allDrawings.forEach((drawing) => {
      if (drawing.type === 'draw') {
        ctx.beginPath();
        drawing.coordinates.forEach((coord, index) => {
          if (index === 0) {
            ctx.moveTo(coord.x, coord.y);
          } else {
            ctx.lineTo(coord.x, coord.y);
          }
        });
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (drawing.type === 'text') {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'blue';
        ctx.fillText(drawing.text, drawing.x, drawing.y);
      }
    });
  };

  useEffect(() => {
    adjustCanvasSize();

    // Usar ResizeObserver para detectar mudanças no tamanho da imagem
    const resizeObserver = new ResizeObserver(() => {
      adjustCanvasSize();
    });

    if (imgRef.current) {
      resizeObserver.observe(imgRef.current);
    }

    // Limpeza do observer quando o componente é desmontado
    return () => {
      if (imgRef.current) {
        resizeObserver.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log(historyDrawings);
  }, [historyDrawings]);

  useEffect(() => {
    // Atualiza o canvas toda vez que allDrawings muda
    redrawAllDrawings();
  }, [allDrawings]);

  const handleMouseDown = (event) => {
    if (mode === 'draw') {
      setIsDrawing(true);
      const { offsetX, offsetY } = event.nativeEvent;
      setCoordinates([{ x: offsetX, y: offsetY }]);

      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    } else if (mode === 'text') {
      const { offsetX, offsetY } = event.nativeEvent;
      setTextPosition({ x: offsetX, y: offsetY });
      setShowDialog(true);

      // Foca automaticamente no input ao abrir o diálogo
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing || mode !== 'draw') return;

    const { offsetX, offsetY } = event.nativeEvent;
    setCoordinates((prevCoords) => [...prevCoords, { x: offsetX, y: offsetY }]);

    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (mode === 'draw') {
      setIsDrawing(false);
      saveDrawing();
    }
  };

  const saveDrawing = () => {
    if (coordinates.length > 0) {
      const newDrawing = { type: 'draw', coordinates };

      // Adiciona o desenho ao array de todos os desenhos
      setAllDrawings((prevDrawings) => [...prevDrawings, newDrawing]);

      // Atualiza o histórico de desenhos e exibe no console após a atualização
      setHistoryDrawings((prevHistory) => [...prevHistory, newDrawing]);

      // Limpa o array de coordenadas
      setCoordinates([]);

      // Limpa o histórico de redo
      setRedoDrawings([]);
    }
  };

  const saveText = ({ x, y, text }) => {
    const newText = { type: 'text', x, y, text };

    // Adiciona o texto ao array de todos os desenhos
    setAllDrawings((prevDrawings) => [...prevDrawings, newText]);

    // Atualiza o histórico de desenhos
    setHistoryDrawings((prevHistory) => [...prevHistory, newText]);

    // Limpa o histórico de redo
    setRedoDrawings([]);
  };

  const handleClearCanvas = () => {
    setAllDrawings([]);
    setHistoryDrawings([]);
    setRedoDrawings([]);
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleUndo = () => {
    if (historyDrawings.length > 0) {
      // Remove o último desenho do histórico
      const lastDrawing = historyDrawings[historyDrawings.length - 1];
      setHistoryDrawings((prevHistory) => prevHistory.slice(0, -1));

      // Adiciona o último desenho ao histórico de redo
      setRedoDrawings((prevRedo) => [...prevRedo, lastDrawing]);

      // Remove o último desenho dos desenhos atuais
      setAllDrawings((prevDrawings) => prevDrawings.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoDrawings.length > 0) {
      // Remove o último desenho do histórico de redo
      const lastRedoDrawing = redoDrawings[redoDrawings.length - 1];
      setRedoDrawings((prevRedo) => prevRedo.slice(0, -1));

      // Adiciona o último desenho ao histórico de desenhos e ao array de todos os desenhos
      setAllDrawings((prevDrawings) => [...prevDrawings, lastRedoDrawing]);
      setHistoryDrawings((prevHistory) => [...prevHistory, lastRedoDrawing]);
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'draw' ? 'text' : 'draw'));
    if (mode === 'draw') {
      setShowDialog(false);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
    setInputText(''); // Limpar o input após salvar
  };

  const handleSaveText = () => {
    setText(inputText); // Sincroniza o texto do formulário com o estado no componente pai
    saveText({ x: textPosition.x, y: textPosition.y, text: inputText }); // Salvar o texto na posição clicada
    handleClose(); // Fechar o diálogo após salvar
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        ref={imgRef}
        src="/model.png" // Substitua pelo caminho da sua imagem
        alt="Imagem para Desenho"
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        onLoad={adjustCanvasSize} // Garantir que o canvas seja ajustado após o carregamento da imagem
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: mode === 'draw' ? 'crosshair' : 'text',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Para garantir que o desenho pare ao sair do canvas
      ></canvas>
      <button onClick={handleClearCanvas} style={{ marginTop: '10px' }}>Limpar Desenho</button>
      <button onClick={handleUndo} style={{ marginTop: '10px' }}>Desfazer</button>
      <button onClick={handleRedo} style={{ marginTop: '10px' }}>Refazer</button>
      <button onClick={toggleMode} style={{ marginTop: '10px' }}>
        Mudar para {mode === 'draw' ? 'Texto' : 'Desenho'}
      </button>
      
      {/* Diálogo para inserção de texto */}
      {showDialog && (
        <div
          style={{
            position: 'absolute',
            top: textPosition.y,
            left: textPosition.x,
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid black',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite o texto"
          />
          <button onClick={handleSaveText}>Salvar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
