import { useState } from 'react';

export default function Kanban() {
  const [columns, setColumns] = useState({
    todo: [
      { id: 1, titulo: 'Tarefa 1', descricao: 'Descrição da tarefa 1', autor: 'Autor 1' },
      { id: 2, titulo: 'Tarefa 2', descricao: 'Descrição da tarefa 2', autor: 'Autor 2' }
    ],
    inProgress: [
      { id: 3, titulo: 'Tarefa 3', descricao: 'Descrição da tarefa 3', autor: 'Autor 3' },
      { id: 4, titulo: 'Tarefa 4', descricao: 'Descrição da tarefa 4', autor: 'Autor 4' }
    ],
    done: [
      { id: 5, titulo: 'Tarefa 5', descricao: 'Descrição da tarefa 5', autor: 'Autor 5' },
      { id: 6, titulo: 'Tarefa 6', descricao: 'Descrição da tarefa 6', autor: 'Autor 6' }
    ]
  });

  const [newTask, setNewTask] = useState({ titulo: '', descricao: '', autor: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskColumn, setEditingTaskColumn] = useState(null);

  const onDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  const onDrop = (e, targetColumn) => {
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn !== targetColumn) {
      setColumns((prevColumns) => {
        const sourceItems = [...prevColumns[sourceColumn]];
        const targetItems = [...prevColumns[targetColumn]];

        const taskIndex = sourceItems.findIndex(t => t.id === taskId);
        const task = sourceItems[taskIndex];
        sourceItems.splice(taskIndex, 1);
        targetItems.push(task);

        return {
          ...prevColumns,
          [sourceColumn]: sourceItems,
          [targetColumn]: targetItems,
        };
      });
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (task, columnId) => {
    setColumns((prevColumns) => {
      const updatedItems = prevColumns[columnId].filter(t => t.id !== task.id);
      return {
        ...prevColumns,
        [columnId]: updatedItems,
      };
    });
  };

  const handleEditClick = (task, columnId) => {
    setEditingTask(task);
    setEditingTaskColumn(columnId);
  };

  const handleEditSave = () => {
    if (editingTask.titulo.trim() !== '') {
      setColumns((prevColumns) => {
        const updatedColumns = { ...prevColumns };
        updatedColumns[editingTaskColumn] = updatedColumns[editingTaskColumn].map((task) =>
          task.id === editingTask.id ? editingTask : task
        );
        return updatedColumns;
      });
      setEditingTask(null);
      setEditingTaskColumn(null);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.titulo.trim() !== '') {
      const newTaskWithId = { ...newTask, id: Date.now() };
      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: [...prevColumns.todo, newTaskWithId],
      }));
      setNewTask({ titulo: '', descricao: '', autor: '' }); // Clear input after adding task
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-center gap-4 mb-8">
        {Object.entries(columns).map(([columnId, tasks]) => (
          <div
            key={columnId}
            className="p-4 w-64 bg-gray-100 rounded-lg shadow-lg"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, columnId)}
          >
            <h2 className="text-lg font-bold mb-4 capitalize">{columnId}</h2>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 mb-2 bg-white rounded-lg shadow cursor-pointer flex justify-between items-center"
                draggable
                onDragStart={(e) => onDragStart(e, task, columnId)}
              >
                <div>
                  <div><strong>Título:</strong> {task.titulo}</div>
                  <div><strong>Descrição:</strong> {task.descricao}</div>
                  <div><strong>Autor:</strong> {task.autor}</div>
                </div>
                <div className="flex items-center">
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(task, columnId)}
                  >
                    Editar
                  </button>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(task, columnId)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <form onSubmit={handleAddTask} className="flex flex-col items-center">
          <input
            type="text"
            value={newTask.titulo}
            onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })}
            className="p-2 mx-1 border border-gray-300 rounded"
            placeholder="Título da nova tarefa"
          />
          <input
            type="text"
            value={newTask.descricao}
            onChange={(e) => setNewTask({ ...newTask, descricao: e.target.value })}
            className="p-2 mx-1 border border-gray-300 rounded"
            placeholder="Descrição"
          />
          <input
            type="text"
            value={newTask.autor}
            onChange={(e) => setNewTask({ ...newTask, autor: e.target.value })}
            className="p-2 mx-1 border border-gray-300 rounded"
            placeholder="Autor"
          />
          <button
            type="submit"
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Adicionar Tarefa
          </button>
        </form>
      </div>

      {/* Modal for editing task */}
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Editar Tarefa</h3>
            <input
              type="text"
              value={editingTask.titulo}
              onChange={(e) => setEditingTask({ ...editingTask, titulo: e.target.value })}
              className="p-2 mb-4 border border-gray-300 rounded w-full"
              placeholder="Título"
            />
            <input
              type="text"
              value={editingTask.descricao}
              onChange={(e) => setEditingTask({ ...editingTask, descricao: e.target.value })}
              className="p-2 mb-4 border border-gray-300 rounded w-full"
              placeholder="Descrição"
            />
            <input
              type="text"
              value={editingTask.autor}
              onChange={(e) => setEditingTask({ ...editingTask, autor: e.target.value })}
              className="p-2 mb-4 border border-gray-300 rounded w-full"
              placeholder="Autor"
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                onClick={handleEditSave}
              >
                Salvar
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditingTask(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
