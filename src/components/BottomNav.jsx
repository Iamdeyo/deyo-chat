import { signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const BottomNav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bottomNav">
      <img src={currentUser.photoURL} alt="avatar" />
      <span>{currentUser.displayName}</span>
      <button onClick={() => signOut(auth)}>
        <FiLogOut size={20} />
      </button>
    </div>
  );
};
export default BottomNav;
