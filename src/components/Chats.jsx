import { FiMoreHorizontal, FiUserPlus, FiVideo } from 'react-icons/fi';
import Input from './Input';
import Message from './Message';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Chats = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const chatRef = collection(db, 'chats', data.chatId, 'messages');
    const chatQuery = query(chatRef, orderBy('date', 'desc'), limit(pageSize));
    const unsub = onSnapshot(chatQuery, (doc) => {
      setMessages(doc.docs);
    });

    return () => {
      unsub();
    };
  }, [data.chatId, pageSize]);

  const handleReactEnd = () => {
    if (messages.length >= pageSize) {
      setPageSize((prev) => (prev = prev + 10));
    }
  };

  // useEffect(() => {
  //   setPageSize(10);
  // }, [data.chatId]);
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

      <div
        className="mgsContainer"
        onScroll={(e) => {
          if (
            e.currentTarget.scrollHeight ===
            window.innerHeight - e.currentTarget.scrollTop
          ) {
            handleReactEnd();
          }
        }}
        onClick={(e) => {
          // console.log(messages.length);
          // console.log(pageSize);
          ref.current.scrollIntoView();
        }}
      >
        {messages &&
          messages?.map((mgs) => (
            <Message
              own={currentUser.uid === mgs.data().senderId}
              key={mgs.id}
              mgs={mgs.data()}
            />
          ))}
      </div>

      <Input />
    </div>
  );
};
export default Chats;
