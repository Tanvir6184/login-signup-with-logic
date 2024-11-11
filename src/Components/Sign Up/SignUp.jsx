import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../../Firebase.init";
import { FaEye, FaEyeSlash, FaSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    // reset error and state
    setErrorMessage("");
    setSuccess(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/;
    const name = e.target.name.value;
    const photo = e.target.url.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    if (!terms) {
      setErrorMessage("Please Accept Our Terms And Conditions");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be 6 character or longer");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Please provide valid type of password which has one special character, one uppercase word and one lowercase word"
      );
      return;
    }

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // send verification email address
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification email has been sent");
        });
      })
      .catch((error) => {
        console.log("Error", error);
        setErrorMessage(error.message);
        setSuccess(false);
      });

    // update profile name and photo url
    const profile = {
      displayName: name,
      photoURL: photo,
    };
    updateProfile(auth.currentUser, profile)
      .then(() => {
        console.log("user profile updated");
      })
      .catch((error) => {
        console.log("profile update error", error);
      });
  };

  return (
    <div className="hero min-h-screen bg-purple-400 rounded-lg">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6 ">
            Nature is deeply committed to sustainability and environmental
            impact, focusing on creating products that are eco-friendly and
            ethically sourced. By emphasizing transparency, they prioritize
            ingredients that are safe for both people and the planet, often
            derived from natural, renewable sources. This approach not only
            reduces waste but also minimizes carbon footprint. Furthermore, the
            company actively supports reforestation, conservation efforts, and
            community initiatives, fostering a culture of responsibility and
            care for future generations.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="url"
                placeholder="Photo url"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                autoComplete="on"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                autoComplete="on"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute left-72 top-12"
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label justify-start cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  className="checkbox checkbox-primary"
                />
                <span className="label-text ml-3">
                  Accept our terms & conditions
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {errorMessage && (
            <p className="text-xm text-center text-red-600 font-bold">
              {errorMessage}
            </p>
          )}
          {/* success message showing */}
          {success && (
            <p className="text-green-600 font-bold text-center">
              Successfully Created Account
            </p>
          )}
          <p className="text-purple-950 font-bold text-center">
            Already have an account? Please <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
