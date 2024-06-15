import PropTypes from "prop-types"

export default function Message({ title }) {
  return (
    <div className="msg">
      <p>{title}</p>
    </div>
  )
}

Message.propTypes = {
  title: PropTypes.string.isRequired
}