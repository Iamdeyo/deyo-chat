const UserChats = ({ user, date, lastMgs }) => {
  // console.log(date);
  return (
    <div className="userChats">
      <img src={user?.photoURL} alt="user-dp" />
      <div className="info">
        <span className="username">{user?.displayName}</span>
        <span className="lastMgs">{lastMgs?.text}</span>
      </div>
      <span className="border"></span>
    </div>
  );
};
export default UserChats;
