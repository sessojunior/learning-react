import { useState } from "react";

import Form from "./components/Form";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

import { TTasks } from "./types.d";

export default function App() {

  const [tasks, setTasks] = useState<TTasks[]>([
    { id: 1, title: "Lavar a louça", difficulty: 1 },
    { id: 2, title: "Organizar as roupas", difficulty: 2 },
    { id: 4, title: "Estudar React", difficulty: 2 },
    { id: 5, title: "Arrumar o quarto", difficulty: 3 },
    { id: 6, title: "Viajar na Europa", difficulty: 1 },
  ])

  return (
    <>
      <Header />
      <Form tasks={tasks} setTasks={setTasks} />
      <Tasks tasks={tasks} setTasks={setTasks} />
    </>
  )
}
