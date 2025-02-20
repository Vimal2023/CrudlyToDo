import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const [radioData, setRadioData] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading</h2>;
  }
  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All Data</h2>
      <input
        className="form-check-input"
        name="gender"
        type="radio"
        checked={radioData === ""}
        onChange={() => setRadioData("")}
      />
      <label className="form-check-label">All</label>
      <input
        className="form-check-input"
        name="gender"
        value="Male"
        type="radio"
        checked={radioData === "Male"}
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Male</label>
      <input
        className="form-check-input"
        name="gender"
        value="Female"
        type="radio"
        checked={radioData === "Female"}
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Female</label>

      <div>
        {users &&
          users
            .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((ele) => {
                if (radioData === "Male") {
                    return ele.gender === radioData;
                }
                else if (radioData === "Female") {
                    return ele.gender === radioData;
                } else return ele;
            })
            .map((ele) => (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {ele.email}
                  </h6>
                  <p className="card-text">{ele.age}</p>
                  <button
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <button to={`/edit/${ele.id}`} className="card-link">
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(ele.id))}
                    className="card-link"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;
