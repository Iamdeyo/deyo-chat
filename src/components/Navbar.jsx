import { signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navBar">
      <span className="logo">Deyo Chat</span>
      <div>
        <img src={currentUser.photoURL} alt="avatar" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  );
};
export default Navbar;
