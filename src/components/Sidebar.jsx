import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import Navbar from './Navbar';
import Search from './Search';
import UserChats from './UserChats';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import BottomNav from './BottomNav';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState(null);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelectChat = async (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <div className="sideBar">
      <Navbar />
      <Search />
      <div className="userChatContainer">
        {chats &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                key={chat[0]}
                onClick={() => handleSelectChat(chat[1].userInfo)}
              >
                <UserChats
                  user={chat[1].userInfo}
                  lastMgs={chat[1].lastMessage}
                  date={chat[1].date}
                  unread={chat[1].unreadMgsCount}
                />
              </div>
            ))}
      </div>
      <BottomNav />
    </div>
  );
};
export default Sidebar;
