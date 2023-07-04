import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { getErrorMessage } from '../utils/errorHandles';
import { useContext, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/logo.svg';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" replace={true} />;
  }

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
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
        const res = await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        const errorCode = err.code;
        setErrorMessage(getErrorMessage(errorCode));
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
          <span className="title"> Login </span>
          <span className="desc"> Glad you're back! </span>
          <form onSubmit={handleSubmit}>
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
            <span className="error"> {errorMessage}</span>
            <button disabled={isLoading}>
              Login {isLoading && <FiLoader className="btnLoader" />}{' '}
            </button>
          </form>
          <div className="link">
            Don't have an account yet ? <Link to={'/register'}>Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
