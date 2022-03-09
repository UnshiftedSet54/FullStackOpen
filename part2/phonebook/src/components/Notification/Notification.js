const Notification = ({message}) => {
  if(!message.msg) return <div></div>

  if(message.error === false) return <div className="success">{message.msg}</div>

  return <div className="error">{message.msg}</div>
}

export default Notification