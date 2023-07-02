import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { MdOutlineAddPhotoAlternate, MdAttachFile } from 'react-icons/md';
import { ChatContext } from '../context/ChatContext';
import {
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
  increment,
  setDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { getErrorMessage } from '../utils/errorHandles';

const Input = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const handleSendMgs = async (e) => {
    e.preventDefault();
    const uid = uuid();
    const chatRef = doc(db, 'chats', data.chatId, 'messages', uid);

    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (err) => {
            const errorCode = err.code;
            // setErrrorMessage(getErrorMessage(errorCode));
            console.log(errorCode);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await setDoc(chatRef, {
                  uid,
                  senderId: currentUser.uid,
                  text: text,
                  img: downloadURL,
                  date: Timestamp.now(),
                });
              }
            );
          }
        );
      } else {
        await setDoc(chatRef, {
          uid,
          senderId: currentUser.uid,
          text: text,
          img: img,
          date: Timestamp.now(),
        });
      }
      // add to user chats
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
      // add to friends userChats
      await updateDoc(doc(db, 'userChats', data?.user?.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.unreadMgsCount']: increment(1),
        [data.chatId + '.date']: serverTimestamp(),
      });
      setText('');
      setImg(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="inputContainer">
      <form onSubmit={handleSendMgs}>
        <input
          type="text"
          placeholder="Text something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <input
          style={{ display: 'none' }}
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <span className="inputIcon">
          <MdAttachFile size={20} />
        </span>
        <label htmlFor="file" className="inputIcon">
          <MdOutlineAddPhotoAlternate size={20} />
        </label>
        <button className="inputIcon">
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
};
export default Input;
