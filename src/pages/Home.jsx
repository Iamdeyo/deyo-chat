import Chats from '../components/Chats';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <>
      <div className="mainContainer">
        <Sidebar />

        <Chats />
      </div>
    </>
  );
};
export default Home;
