export default function Toolbar({ insertText }) {

  const buttons = [
    { label: "h1", tag: "h1", before: "# ", after: "" },
    { label: "h2", tag: "h2", before: "## ", after: "" },
    { label: "bold", tag: "b", before: "**", after: "**" },
    { label: "italic", tag: "i", before: "*", after: "*" },
    { label: "link", tag: "a", before: "[", after: "](https://)" },
    { label: "code", tag: "code", before: "```", after: "```" },
    { label: "li", tag: "li", before: "- ", after: "" },
    { label: "hr", tag: "hr", before: "\n---\n", after: "" },
  ]

  return (
    <div className="flex flex-wrap gap-2 pb-4 justify-center">
      {buttons.map((button) => (
        <button
          key={button.label}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all"
        onClick={() => insertText(button.before, button.after)} >{button.label}</button>
      ))}
    </div>
  )
}
