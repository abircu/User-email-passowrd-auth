import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebse.config";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [isError, setError] = useState("");
  const [isSuccesed, setSucces] = useState("");
  const emailRef = useRef(null);
  const handleLoginBtn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setError("");
    setSucces("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setSucces("User login success");
        } else {
          alert("please verified your email");
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setError("information wrong");
      });
  };
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide an email");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("please write a valid email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("please check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLoginBtn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a
                    onClick={handleResetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {isError && <p className="text-xl text-red-400">{isError}</p>}
            {isSuccesed && (
              <p className=" text-xl text-green-600">{isSuccesed}</p>
            )}
            <p>
              If you new plese{" "}
              <NavLink
                className="text-blue-700 border-b-2 border-blue-700"
                to="/register"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
