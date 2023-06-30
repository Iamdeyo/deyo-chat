import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { getErrorMessage } from '../utils/errorHandles';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      const errorCode = err.code;
      setErrrorMessage(getErrorMessage(errorCode));
    }
  };
  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo"> Deyo Chat</span>
          <span className="title"> Login </span>
          <span className="desc"> Glad you're back! </span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <span className="error"> {errorMessage}</span>
            <button>Login</button>
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
