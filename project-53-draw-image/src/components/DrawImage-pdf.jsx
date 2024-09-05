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
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (drawing.type === 'text') {
        const x = drawing.x * scale;
        const y = drawing.y * scale;
        ctx.font = '20px Arial';
        ctx.fillStyle = 'blue';
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

      setAllDrawings((prevDrawings) => [...prevDrawings, newDrawing]);
      setHistoryDrawings((prevHistory) => [...prevHistory, newDrawing]);
      setRedoDrawings([]);
      setCoordinates([]);
    }
  };

  const saveText = ({ x, y, text }) => {
    const newText = { type: 'text', x, y, text };

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

  const handleSaveText = () => {
    saveText({ x: textPosition.x, y: textPosition.y, text: inputText });
    handleClose();
  };

  const handlePrintPdf = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;

    // Obtém as dimensões naturais da imagem
    const imgNaturalWidth = img.naturalWidth;
    const imgNaturalHeight = img.naturalHeight;

    // Cria um canvas para desenhar a imagem e os desenhos
    const drawingCanvas = document.createElement('canvas');
    drawingCanvas.width = imgNaturalWidth;
    drawingCanvas.height = imgNaturalHeight;
    const ctx = drawingCanvas.getContext('2d');

    // Desenha a imagem no canvas
    ctx.drawImage(img, 0, 0, imgNaturalWidth, imgNaturalHeight);

    // Desenha os desenhos sobre a imagem
    ctx.drawImage(canvas, 0, 0, imgNaturalWidth, imgNaturalHeight);

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

      <button onClick={handleClearCanvas} style={{ marginTop: '10px' }}>Limpar Desenho</button>
      <button onClick={handleUndo} style={{ marginTop: '10px' }}>Desfazer</button>
      <button onClick={handleRedo} style={{ marginTop: '10px' }}>Refazer</button>
      <button onClick={toggleMode} style={{ marginTop: '10px' }}>
        Mudar para {mode === 'draw' ? 'Texto' : 'Desenho'}
      </button>
      <button onClick={handlePrintPdf} style={{ marginTop: '10px' }}>Imprimir em PDF</button>

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
