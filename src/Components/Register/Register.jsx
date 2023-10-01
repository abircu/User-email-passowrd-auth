import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase/firebse.config";

const Register = () => {
  const [iserror, setError] = useState("");
  const [success, setSucces] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    if (password.length < 6) {
      setError("password must be six carrecter");
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
        <input
          className="bg-gray-100 mt-1 mb-1 p-1"
          type="password"
          name="password"
          id=""
          placeholder="Enter your password"
        />
        <br />
        <div className="btn btn-secondary flex items-center justify-center">
          <input type="submit" value="Register" />
        </div>
      </form>
      {iserror && <p className="text-xl text-red-400">{iserror}</p>}
      {success && <p className="text-xl text-green-500">{success}</p>}
    </div>
  );
};

export default Register;
