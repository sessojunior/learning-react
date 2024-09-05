import ProgressMenu from './ProgressMenu';

export default function Container({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
      <ProgressMenu />
      {children}
    </div>
  )
}
