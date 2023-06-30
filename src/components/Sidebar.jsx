import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import Navbar from './Navbar';
import Search from './Search';
import UserChats from './UserChats';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

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
  // console.log(currentUser.uid);
  console.log(Object.entries(chats));
  return (
    <div className="sideBar">
      <Navbar />
      <Search />
      {Object.entries(chats)?.map((chat) => (
        <div key={chat[0]}>
          <UserChats user={chat[1].userInfo} date={chat[1].userInfo.date} />
        </div>
      ))}
    </div>
  );
};
export default Sidebar;
