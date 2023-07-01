import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { formatMessageTime } from '../utils/TimeFormatHandler';

const UserChats = ({ user, date, lastMgs, unread }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const chatId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

  const currentChatId = data.chatId;

  useEffect(() => {
    const updateUnreadCount = async () => {
      if (chatId === currentChatId && unread > 0) {
        // console.log(chatId, currentChatId);
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [currentChatId + '.unreadMgsCount']: 0,
        });
      }
    };

    updateUnreadCount();
  }, [lastMgs, currentChatId]);
  return (
    <div className="userChats">
      <img src={user?.photoURL} alt="user-dp" />
      <div className="info">
        <span className="username">{user?.displayName}</span>
        <span className="lastMgs">{lastMgs?.text}</span>
      </div>

      <span className="dateTime">{formatMessageTime(date)}</span>

      {unread > 0 && (
        <span className="unread">{unread > 99 ? '99' : unread} </span>
      )}
      <span className="border"></span>
    </div>
  );
};
export default UserChats;
