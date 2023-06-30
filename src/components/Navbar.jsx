import { signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../firebase';

const Navbar = () => {
  return (
    <div className="navBar">
      <span className="logo">Deyo Chat</span>
      <div>
        <img src="https://loremflickr.com/g/320/240/paris" alt="avatar" />
        <span>John Doe</span>
        <button onClick={() => signOut(auth)}>
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  );
};
export default Navbar;
