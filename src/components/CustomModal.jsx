import "./CustomModal.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CustomModal = ({ id, setShowPopup }) => {
  const allUsers = useSelector((state) => state.app.users);
  const singleUser = allUsers.find((ele) => ele.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>

        {singleUser ? (
          <>
            <h2>{singleUser.name}</h2>
            <h2>{singleUser.email}</h2>
            <h2>{singleUser.age}</h2>
            <h2>{singleUser.gender}</h2>
          </>
        ) : (
          <h2>User not found</h2>
        )}
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  id: PropTypes.string.isRequired,
  setShowPopup: PropTypes.func.isRequired,
};

export default CustomModal;
