import useWindowSize from "../hooks/useWindowSize"

export default function DisplayWindowSize() {
  const { width, height } = useWindowSize()
  return (
    <div>
      <h4>Window Size</h4>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
}
