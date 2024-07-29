export default function Greeting({ name }: GreetingProps) {
  return <h2>Olá {name ?? 'visitante'}!</h2>
}

type GreetingProps = {
  name?: string
}