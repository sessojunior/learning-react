import { useState, useRef, useEffect } from 'react';

// Para imprimir em PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DrawImage() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [allDrawings, setAllDrawings] = useState([]);
  const [historyDrawings, setHistoryDrawings] = useState([]);
  const [redoDrawings, setRedoDrawings] = useState([]);
  const [mode, setMode] = useState('draw');
  const [color, setColor] = useState('red'); // Estado para a cor selecionada
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [showDialog, setShowDialog] = useState(false);
  const [scale, setScale] = useState(1);

  const adjustCanvasSize = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;

    if (canvas && img) {
      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;
      setScale(img.clientWidth / img.naturalWidth);
      redrawAllDrawings();
    }
  };

  const redrawAllDrawings = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    allDrawings.forEach((drawing) => {
      ctx.save();

      if (drawing.type === 'draw') {
        ctx.beginPath();
        drawing.coordinates.forEach((coord, index) => {
          const x = coord.x * scale;
          const y = coord.y * scale;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.strokeStyle = drawing.color || 'red'; // Usa a cor do desenho ou a cor padrão
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (drawing.type === 'text') {
        const x = drawing.x * scale;
        const y = drawing.y * scale;
        ctx.font = '20px Arial';
        ctx.fillStyle = drawing.color || 'blue'; // Usa a cor do texto ou a cor padrão
        ctx.fillText(drawing.text, x, y);
      }

      ctx.restore();
    });
  };

  useEffect(() => {
    adjustCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      adjustCanvasSize();
    });

    if (imgRef.current) {
      resizeObserver.observe(imgRef.current);
    }

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
    redrawAllDrawings();
  }, [allDrawings, scale]);

  const handleMouseDown = (event) => {
    if (mode === 'draw') {
      setIsDrawing(true);
      const { offsetX, offsetY } = event.nativeEvent;
      setCoordinates([{ x: offsetX / scale, y: offsetY / scale }]);

      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    } else if (mode === 'text') {
      const { offsetX, offsetY } = event.nativeEvent;
      setTextPosition({ x: offsetX / scale, y: offsetY / scale });
      setShowDialog(true);

      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing || mode !== 'draw') return;

    const { offsetX, offsetY } = event.nativeEvent;
    setCoordinates((prevCoords) => [
      ...prevCoords,
      { x: offsetX / scale, y: offsetY / scale }
    ]);

    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color; // Usa a cor selecionada
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
      const newDrawing = { type: 'draw', coordinates, color }; // Salva a cor do desenho

      setAllDrawings((prevDrawings) => [...prevDrawings, newDrawing]);
      setHistoryDrawings((prevHistory) => [...prevHistory, newDrawing]);
      setRedoDrawings([]);
      setCoordinates([]);
    }
  };

  const saveText = ({ x, y, text }) => {
    const newText = { type: 'text', x, y, text, color };

    setAllDrawings((prevDrawings) => [...prevDrawings, newText]);
    setHistoryDrawings((prevHistory) => [...prevHistory, newText]);
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
      const lastDrawing = historyDrawings[historyDrawings.length - 1];
      setHistoryDrawings((prevHistory) => prevHistory.slice(0, -1));
      setRedoDrawings((prevRedo) => [...prevRedo, lastDrawing]);
      setAllDrawings((prevDrawings) => prevDrawings.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoDrawings.length > 0) {
      const lastRedoDrawing = redoDrawings[redoDrawings.length - 1];
      setRedoDrawings((prevRedo) => prevRedo.slice(0, -1));
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
    setInputText('');
  };

  const handleSaveText = (e) => {
    e.preventDefault();
    saveText({ x: textPosition.x, y: textPosition.y, text: inputText });
    handleClose();
  };

  const handlePrintPdf = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;

    // Obtém as dimensões naturais da imagem
    const imgNaturalWidth = img.naturalWidth;
    const imgNaturalHeight = img.naturalHeight;

    // Cria um canvas para desenhar a imagem e os desenhos com a mesma resolução
    const drawingCanvas = document.createElement('canvas');
    drawingCanvas.width = imgNaturalWidth;
    drawingCanvas.height = imgNaturalHeight;
    const ctx = drawingCanvas.getContext('2d');

    // Desenha a imagem no canvas
    ctx.drawImage(img, 0, 0, imgNaturalWidth, imgNaturalHeight);

    // Ajusta o canvas de desenhos para corresponder à resolução da imagem
    const drawingCanvasResized = document.createElement('canvas');
    drawingCanvasResized.width = imgNaturalWidth;
    drawingCanvasResized.height = imgNaturalHeight;
    const ctxResized = drawingCanvasResized.getContext('2d');
    ctxResized.drawImage(canvas, 0, 0, imgNaturalWidth, imgNaturalHeight);

    // Desenha os desenhos no canvas principal com a resolução original
    ctx.drawImage(drawingCanvasResized, 0, 0);

    // Converte o canvas para imagem
    const combinedImgData = drawingCanvas.toDataURL('image/png');

    // Cria o PDF com o tamanho da imagem
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [imgNaturalWidth, imgNaturalHeight] // Define o formato do PDF para corresponder ao tamanho natural da imagem
    });

    // Adiciona a imagem combinada ao PDF
    pdf.addImage(combinedImgData, 'PNG', 0, 0, imgNaturalWidth, imgNaturalHeight);

    pdf.save('drawing.pdf');
  };

const recreateHistory = () => {
  const img = imgRef.current;
  const canvasClone = document.createElement('canvas');
  const ctxClone = canvasClone.getContext('2d');

  // Define o tamanho do canvas clone com base no tamanho natural da imagem
  canvasClone.width = img.naturalWidth;
  canvasClone.height = img.naturalHeight;

  // Calcula a escala entre o tamanho redimensionado da imagem e o tamanho natural
  const scaleX = img.naturalWidth / img.clientWidth;  // Proporção em relação à largura
  const scaleY = img.naturalHeight / img.clientHeight; // Proporção em relação à altura

  // Verifica o tamanho da imagem redimensionada
  console.log(`img.clientWidth: ${img.clientWidth}, img.clientHeight: ${img.clientHeight}`);
  console.log(`img.naturalWidth: ${img.naturalWidth}, img.naturalHeight: ${img.naturalHeight}`);
  console.log(`scaleX: ${scaleX}, scaleY: ${scaleY}`);

  // Desenha a imagem original no canvas clone no tamanho natural
  ctxClone.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  // Redesenha todos os desenhos no canvas clone, ajustando as coordenadas
  allDrawings.forEach((drawing) => {
    ctxClone.save();

    if (drawing.type === 'draw') {
      ctxClone.beginPath();
      drawing.coordinates.forEach((coord, index) => {
        // Recalcula as coordenadas para o tamanho natural da imagem
        const x = coord.x * scaleX; // Ajuste para o tamanho natural
        const y = coord.y * scaleY; // Ajuste para o tamanho natural
        if (index === 0) {
          ctxClone.moveTo(x, y);
        } else {
          ctxClone.lineTo(x, y);
        }
      });
      ctxClone.strokeStyle = drawing.color || 'red'; // Usa a cor do desenho ou a cor padrão
      ctxClone.lineWidth = 2 * scaleX; // Ajusta a largura do traço com base na escala
      ctxClone.stroke();
    } else if (drawing.type === 'text') {
      // Recalcula as coordenadas do texto
      const x = drawing.x * scaleX; // Ajuste para o tamanho natural
      const y = drawing.y * scaleY; // Ajuste para o tamanho natural
      ctxClone.font = `${20 * scaleX}px Arial`; // Ajusta o tamanho da fonte com base na escala
      ctxClone.fillStyle = drawing.color || 'blue'; // Usa a cor do texto ou a cor padrão
      ctxClone.fillText(drawing.text, x, y);
    }

    ctxClone.restore();
  });

  // Converte o canvas clone para uma URL de imagem
  const newImage = canvasClone.toDataURL('image/png');

  // Cria uma nova imagem no DOM com o tamanho natural
  const imgElement = document.createElement('img');
  imgElement.src = newImage;
  imgElement.style.width = `${img.naturalWidth}px`;
  imgElement.style.height = `${img.naturalHeight}px`;

  // Adiciona a nova imagem ao body (ou qualquer outro container)
  document.body.appendChild(imgElement);
};

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        ref={imgRef}
        src="/model.png"
        alt="Imagem para Desenho"
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        onLoad={adjustCanvasSize}
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
        onMouseLeave={handleMouseUp}
      ></canvas>

      <button onClick={recreateHistory} style={{ marginTop: '10px' }}>Recriar Desenhos (usar histórico)</button>
      <button onClick={handlePrintPdf} style={{ marginTop: '10px' }}>Imprimir em PDF</button>
      <button onClick={handleClearCanvas} style={{ marginTop: '10px' }}>Limpar Desenho</button>
      <button onClick={handleUndo} style={{ marginTop: '10px' }}>Desfazer</button>
      <button onClick={handleRedo} style={{ marginTop: '10px' }}>Refazer</button>
      <button onClick={toggleMode} style={{ marginTop: '10px' }}>
        Mudar para {mode === 'draw' ? 'Texto' : 'Desenho'}
      </button>

      <span>
        <label htmlFor="color">Select Color:</label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
        </select>
      </span>

      <p>Observações: Para recriar os desenhos ou imprimir o PDF da imagem, certifique-se que a imagem não esteja redimensionada. Esteja em 100%. A largura mínima da página deve ser maior que a largura da imagem.</p>

      {showDialog && (
        <div
          style={{
            position: 'absolute',
            top: textPosition.y * scale,
            left: textPosition.x * scale,
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid black',
          }}
        >
          <form onSubmit={handleSaveText}>
            <span>
              <label htmlFor="color">Color:</label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
              </select>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite o texto"
            />
            <button type='submit'>Salvar</button>
            <button onClick={handleClose}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}
