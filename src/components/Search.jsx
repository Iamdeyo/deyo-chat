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
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      console.log('first');
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
    }
  };

  const { currentUser } = useContext(AuthContext);
  const handleCreateUserChats = async (user) => {
    // check if chats is already existing
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    console.log(combinedId);
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        // create new chat
        await setDoc(doc(db, 'chats', combinedId), { message: [] });

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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleSearch}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
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
