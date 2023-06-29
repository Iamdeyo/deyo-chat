import { FiMoreHorizontal, FiUserPlus, FiVideo } from 'react-icons/fi';
import Input from './Input';
import Message from './Message';

const Chats = () => {
  return (
    <div className="chats">
      <div className="chatTop">
        <img src="https://loremflickr.com/g/320/240/paris" alt="friend-dp" />
        <span className="username">Jane Doe</span>
        <div className="icons">
          <FiVideo />
          <FiUserPlus />
          <FiMoreHorizontal />
        </div>
      </div>
      <div className="mgsContainer">
        <Message />

        <Message own={true} />
      </div>
      <Input />
    </div>
  );
};
export default Chats;
