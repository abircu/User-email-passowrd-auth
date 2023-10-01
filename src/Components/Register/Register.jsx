import { createUserWithEmailAndPassword } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
import auth from "../../firebase/firebse.config";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [iserror, setError] = useState("");
  const [success, setSucces] = useState("");
  const [types, setType] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const accepted = e.target.Terms.checked;
    const password = e.target.password.value;
    console.log(email, password, accepted);
    setError("");
    setSucces("");
    if (password.length < 6) {
      setError("password must be six carrecter");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("passwod must have an uppercase latters");
      return;
    } else if (!accepted) {
      setError("please fill up our term and conditons");
      return;
    }

    setError("");
    setSucces("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSucces("user create successfully");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-2xl">Please Register here</h1>
      <form onSubmit={handleRegister}>
        <input
          className="bg-gray-100 p-1"
          type="email"
          name="email"
          id=""
          placeholder="Enter your Email here"
          required
        />
        <br />
        <div className="flex  items-center relative">
          <input
            className="bg-gray-100 mt-1 mb-1 p-1"
            type={types ? "text" : "password"}
            name="password"
            id=""
            placeholder="Enter your password"
            required
          />

          <span
            onClick={() => setType(!types)}
            className="text-2xl absolute   right-2 "
          >
            {types ? (
              <AiOutlineEye></AiOutlineEye>
            ) : (
              <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
            )}
          </span>
        </div>
        <br />
        <div className="mb-4">
          <input type="checkbox" name="Terms" id="terms" />
          <label htmlFor="terms">
            I agree your all terms <br /> and conditions
          </label>
        </div>
        <div className="btn btn-secondary flex items-center justify-center">
          <input type="submit" value="Register" />
        </div>
      </form>
      {iserror && <p className="text-xl text-red-400">{iserror}</p>}
      {success && <p className="text-xl text-green-500">{success}</p>}
      <p>
        Already have an account ?{" "}
        <NavLink
          className="text-blue-700 border-b-2 border-blue-700"
          to="/login"
        >
          Login
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
