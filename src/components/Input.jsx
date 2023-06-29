import { FiSend } from 'react-icons/fi';
import { MdOutlineAddPhotoAlternate, MdAttachFile } from 'react-icons/md';

const Input = () => {
  return (
    <div className="inputContainer">
      <form>
        <input type="text" placeholder="Text something..." />
        <input style={{ display: 'none' }} type="file" id="file" />
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
