import { useContext } from 'react';
import Chats from '../components/Chats';
import Sidebar from '../components/Sidebar';
import { ChatContext } from '../context/ChatContext';

const Home = () => {
  const { data } = useContext(ChatContext);
  return (
    <>
      <div className={`mainContainer ${!data.chatId && 'noChat'}`}>
        <Sidebar />

        {data.chatId ? (
          <Chats />
        ) : (
          <div className="chats">
            <p>start a conversation</p>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
