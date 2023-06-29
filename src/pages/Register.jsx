const Register = () => {
  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo"> Deyo Chat</span>
          <span className="title"> Register </span>
          <span className="desc"> Just some details to get you in.! </span>
          <form>
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
