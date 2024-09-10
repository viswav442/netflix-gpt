import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMesssage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  function handleLogin() {
    setIsSignIn(!isSignIn);
  }

  function handleSubmitForm() {
    const message = validateData(email.current.value, password.current.value);
    setErrorMesssage(message);
    if (message) return;

    if (!isSignIn) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: "Viswa",
            photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid: uid,
                  email,
                  email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMesssage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMesssage(errorCode + " " + errorMessage);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMesssage(errorCode + " " + errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className=" absolute">
        <img
          className="concord-img vlv-creative"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg"
          srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_large.jpg 1800w"
          alt=""
        />
      </div>
      <form
        className="flex justify-center items-center h-screen "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className=" relative bg-black text-white w-1/4 flex flex-col p-10 rounded-md bg-opacity-80">
          <h2 className="mb-4 text-2xl font-bold">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          {!isSignIn && (
            <input
              type="text"
              name="username"
              id="username"
              className="p-2 my-3 rounded-sm text-xs bg-gray-700 "
              placeholder="Username"
            />
          )}
          <input
            ref={email}
            type="email"
            name="email"
            id="email"
            className="p-2 my-3 rounded-sm text-xs bg-gray-700 "
            placeholder="Email Address"
          />
          <input
            ref={password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="p-2 my-3 bg-gray-700 rounded-sm text-xs "
          />
          <p className="text-red-500 text-xs font-semibold">{errorMessage}</p>
          <button
            type="submit"
            className="p-1 my-4 bg-red-600 rounded-sm"
            onClick={handleSubmitForm}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          {isSignIn ? (
            <p className="text-xs ">
              New to Netflix?{" "}
              <a href="#" className="underline" onClick={handleLogin}>
                Sign Up Now
              </a>
            </p>
          ) : (
            <p className="text-xs ">
              Already a user?
              <a href="#" className="underline" onClick={handleLogin}>
                Login
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
