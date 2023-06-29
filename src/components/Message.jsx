const Message = ({ own }) => {
  return (
    <div className={`message ${own && 'own'}`}>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis Lorem
      </p>
      <img src="https://loremflickr.com/g/320/240/paris" alt="photo" />
      <span className="egde"></span>
    </div>
  );
};
export default Message;
