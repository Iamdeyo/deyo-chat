import { signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DefImg from '../assets/def.jpg';
import { ChatContext } from '../context/ChatContext';

const BottomNav = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleSignout = () => {
    dispatch({ type: 'REMOVE_USER' });
    signOut(auth);
  };

  return (
    <div className="bottomNav">
      <img
        src={currentUser.photoURL ? currentUser.photoURL : DefImg}
        alt="avatar"
      />
      <span>{currentUser.displayName}</span>
      <button onClick={handleSignout}>
        <FiLogOut size={20} />
      </button>
    </div>
  );
};
export default BottomNav;
