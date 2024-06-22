import "./topbar.css"
import PropTypes from "prop-types"

export default function Topbar({ title, children }) {
  
  return (
    <div className="topbar">
      <h3>{children} <span>{title}</span></h3>
    </div>
  )
}

Topbar.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}