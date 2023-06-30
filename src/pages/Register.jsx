import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      await updateProfile(res.user, { displayName });
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            await updateProfile(res.user, { photoURL: downloadURL });

            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              email,
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});

            navigate('/');
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo"> Deyo Chat</span>
          <span className="title"> Register </span>
          <span className="desc"> Just some details to get you in.! </span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="email" />
            <input type="password" placeholder="Password" />
            <input style={{ display: 'none' }} type="file" id="file" />
            <label htmlFor="file">
              <img src="https://loremflickr.com/g/320/240/paris" alt="avater" />{' '}
              <span>Add an avatar</span>
            </label>
            <button>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
