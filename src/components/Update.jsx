import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.app.users);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    if (id && users.length) {
      const singleUser = users.find((ele) => ele.id === id);
      if (singleUser) setUpdateData(singleUser);
    }
  }, [id, users]);

  const newData = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: type === "radio" ? (checked ? value : prev[name]) : value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={updateData.name || ""}
            onChange={newData}
          />
        </div>
        <div>
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={updateData.email || ""}
            onChange={newData}
          />
        </div>
        <div>
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={updateData.age || ""}
            onChange={newData}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData.gender === "Male"}
            onChange={newData}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={updateData.gender === "Female"}
            onChange={newData}
          />
          <label className="form-check-label">Female</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
