const Message = ({ own, mgs }) => {
  return (
    <div className={`message ${own && 'own'} ${mgs.img && 'image'}`}>
      {mgs.img && <img src={mgs.img} alt="photo" />}
      <p>{mgs.text}</p>
      <span className="egde"></span>
    </div>
  );
};
export default Message;
