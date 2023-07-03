import UserChats from './UserChats';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  const handleSearch = async (e) => {
    try {
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', username)
      );

      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs);
      setUsers(querySnapshot.docs);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleCreateUserChats = async (user) => {
    // check if chats is already existing
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        // create new chat
        await setDoc(doc(db, 'chats', combinedId), {});

        // add to user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        // add to friends userChats
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
      setUsers([]);
      setUsername('');
      dispatch({ type: 'CHANGE_USER', payload: user });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={`search  + ${username.length > 0 && 'searchResults'}`}>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleEnterKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <span className="searchBtn" onClick={handleSearch}>
          <FiSearch />
        </span>
      </div>
      <div className="userChatContainer">
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleCreateUserChats(user.data())}
            >
              <UserChats user={user.data()} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Search;
