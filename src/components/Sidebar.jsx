import Navbar from './Navbar';
import Search from './Search';
import UserChats from './UserChats';

const Sidebar = () => {
  return (
    <div className="sideBar">
      <Navbar />
      <Search />
      <UserChats />
    </div>
  );
};
export default Sidebar;
