import { FiMoreHorizontal, FiUserPlus, FiVideo } from 'react-icons/fi';
import Input from './Input';
import Message from './Message';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Chats = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [message, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().message);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="chats">
      <div className="chatTop">
        <img src={data?.user?.photoURL} alt="friend-dp" />
        <span className="username">{data?.user?.displayName}</span>
        <div className="icons">
          <FiVideo />
          <FiUserPlus />
          <FiMoreHorizontal />
        </div>
      </div>
      <div className="mgsContainer">
        {message.length > 0 &&
          message?.map((mgs) => (
            <Message
              own={currentUser.uid === mgs.senderId}
              key={mgs.id}
              mgs={mgs}
            />
          ))}
      </div>
      <Input />
    </div>
  );
};
export default Chats;
