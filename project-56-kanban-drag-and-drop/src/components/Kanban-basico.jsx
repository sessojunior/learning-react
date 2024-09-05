import { useState } from 'react';

export default function Kanban() {
  const [columns, setColumns] = useState({
    todo: ['Tarefa 1', 'Tarefa 2'],
    inProgress: ['Tarefa 3', 'Tarefa 4'],
    done: ['Tarefa 5', 'Tarefa 6'],
  });

  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskColumn, setEditingTaskColumn] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const onDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData('task', task);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  const onDrop = (e, targetColumn) => {
    const task = e.dataTransfer.getData('task');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn !== targetColumn) {
      setColumns((prevColumns) => {
        const sourceItems = [...prevColumns[sourceColumn]];
        const targetItems = [...prevColumns[targetColumn]];

        const taskIndex = sourceItems.indexOf(task);
        sourceItems.splice(taskIndex, 1);
        targetItems.push(task);

        const updatedColumns = {
          ...prevColumns,
          [sourceColumn]: sourceItems,
          [targetColumn]: targetItems,
        };

        console.log('Quadros atualizados:', updatedColumns);

        return updatedColumns;
      });
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (task, columnId) => {
    setColumns((prevColumns) => {
      const updatedItems = prevColumns[columnId].filter(t => t !== task);
      return {
        ...prevColumns,
        [columnId]: updatedItems,
      };
    });
  };

  const handleEditClick = (task, columnId) => {
    setEditingTask(task);
    setEditingTaskColumn(columnId);
    setEditedTaskText(task);
  };

  const handleEditSave = () => {
    if (editedTaskText.trim() !== '') {
      setColumns((prevColumns) => {
        const updatedColumns = { ...prevColumns };
        updatedColumns[editingTaskColumn] = updatedColumns[editingTaskColumn].map((task) =>
          task === editingTask ? editedTaskText.trim() : task
        );
        return updatedColumns;
      });
      setEditingTask(null);
      setEditingTaskColumn(null);
      setEditedTaskText('');
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: [...prevColumns.todo, newTask.trim()],
      }));
      setNewTask(''); // Clear input after adding task
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
                key={task}
                className="p-4 mb-2 bg-white rounded-lg shadow cursor-pointer flex justify-between items-center"
                draggable
                onDragStart={(e) => onDragStart(e, task, columnId)}
              >
                <span>{task}</span>
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
        <form onSubmit={handleAddTask} className="flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 mx-1 border border-gray-300 rounded"
            placeholder="Digite uma nova tarefa"
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
              value={editedTaskText}
              onChange={(e) => setEditedTaskText(e.target.value)}
              className="p-2 mb-4 border border-gray-300 rounded w-full"
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
};
