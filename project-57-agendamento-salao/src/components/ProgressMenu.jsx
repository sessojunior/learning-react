import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

const steps = [
  { name: 'Início', path: '/' },
  { name: 'Selecionar Profissional', path: '/profissional' },
  { name: 'Selecionar Serviço', path: '/servicos' },
  { name: 'Selecionar Data e Hora', path: '/dataehora' },
  { name: 'Finalizar', path: '/finalizar' },
];

export default function ProgressMenu() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="mb-8">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex space-x-4">
          {steps.map((step, index) => {
            // Verifica se o caminho atual é igual ao caminho da etapa
            const isActive = currentPath === step.path;
            // Verifica se o índice da etapa é menor que o índice da etapa atual
            const isCompleted = steps.findIndex(s => s.path === currentPath) > index;

            return (
              <Link
                key={step.path}
                to={step.path}
                className={`flex flex-1 justify-center items-center text-center py-2 px-4 rounded-md ${
                  isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
