import { useState } from "react";

import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [users, setUsers] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    dispatch(createUser(users));
    e.preventDefault();
    navigate("/read");
  };
  return (
    <div>
      <h2 className="my-2"> Fill the data </h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            onChange={handleChange}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
          />
          <label className="form-check-label">Female</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
