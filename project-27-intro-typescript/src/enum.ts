// Enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
console.log(Direction.Up)

function move(direction: Direction): void {
  console.log(direction)
}
move(Direction.Left)

function getDirectionMessage(direction: Direction): string {
  switch (direction) {
    case Direction.Up:
      return "Cima"
    case Direction.Down:
      return "Baixo"
    case Direction.Left:
      return "Esquerda"
    case Direction.Right:
      return "Direita"
  }
}
console.log(getDirectionMessage(Direction.Up))
console.log(getDirectionMessage(Direction.Down))
console.log(getDirectionMessage(Direction.Left))
console.log(getDirectionMessage(Direction.Right))
