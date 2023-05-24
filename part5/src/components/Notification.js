const Notification = ({ message }) => (
  <>{message ? <p className="error">{message}</p> : null}</>
)

export default Notification
