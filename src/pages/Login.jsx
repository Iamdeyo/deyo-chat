import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.log(err);
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
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
