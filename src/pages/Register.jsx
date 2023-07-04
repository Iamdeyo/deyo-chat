import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { getErrorMessage } from '../utils/errorHandles';
import PhImg from '../assets/regDef.svg';
import { FiLoader } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/logo.svg';

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const [displayPhoto, setDisplayPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [file, setFiles] = useState(null);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" replace={true} />;
  }

  const handleDisplayingPhoto = (e) => {
    if (e.target.files[0]) {
      setFiles(e.target.files[0]);
      setDisplayPhoto(URL.createObjectURL(e.target.files[0]));
    } else {
      setFiles(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Validate username
    if (!displayName) {
      newErrors.displayName = 'Username is required';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setError(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(res.user, { displayName });
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        let photoURL = null;
        if (file) {
          uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (err) => {
              const errorCode = err.code;
              setErrorMessage(getErrorMessage(errorCode));
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  photoURL = await updateProfile(res.user, { photoURL });

                  await setDoc(doc(db, 'users', res.user.uid), {
                    uid: res.user.uid,
                    email,
                    displayName,
                    photoURL: downloadURL,
                  });
                }
              );
            }
          );
        } else {
          await updateProfile(res.user, { photoURL });

          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            email,
            displayName,
            photoURL: null,
          });
        }
        await setDoc(doc(db, 'userChats', res.user.uid), {});

        setIsLoading(false);
      } catch (err) {
        const errorCode = err.code;
        setErrorMessage(getErrorMessage(errorCode));
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">
            {' '}
            <img src={Logo} alt="logo" width={30} height={30} /> Deyo Chat
          </span>
          <span className="title"> Register </span>
          <span className="desc"> Just some details to get you in.! </span>
          <form onSubmit={handleSubmit}>
            <span className="inputError"> {error.displayName} </span>
            <input
              type="text"
              placeholder="Username"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <span className="inputError"> {error.email} </span>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="inputError"> {error.password} </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              style={{ display: 'none' }}
              type="file"
              id="file"
              onChange={handleDisplayingPhoto}
            />
            <label htmlFor="file">
              {!displayPhoto ? (
                <img src={PhImg} alt="avater" />
              ) : (
                <img src={displayPhoto} alt="avater" />
              )}
              <span>Add an avatar</span>
            </label>
            <span className="error"> {errorMessage} </span>
            <button disabled={isLoading}>
              Register {isLoading && <FiLoader className="btnLoader" />}{' '}
            </button>
          </form>
          <div className="link">
            Already have an account ? <Link to={'/login'}>Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
