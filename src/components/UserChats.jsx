const UserChats = ({ user }) => {
  return (
    <div className="userChats">
      <img src={user?.photoURL} alt="user-dp" />
      <div className="info">
        <span className="username">{user?.displayName}</span>
        <span className="lastMgs">
          Lorem ipsum dolor Lorem ipsum dolor sit amet adipisicing elit.
        </span>
      </div>
      <span className="border"></span>
    </div>
  );
};
export default UserChats;
