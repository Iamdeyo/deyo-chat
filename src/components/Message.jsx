const Message = ({ own, mgs }) => {
  return (
    <div className={`message ${own && 'own'}`}>
      <p>{mgs.text}</p>
      {mgs.img && <img src={mgs.img} alt="photo" />}
      <span className="egde"></span>
    </div>
  );
};
export default Message;
