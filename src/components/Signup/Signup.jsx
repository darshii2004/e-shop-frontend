import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/user/create-user`, { name, email, password, avatar })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        navigate("/verify-email");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage: `url()`,
        }}
      >
        <div className="absolute bg-gradient-to-b from-blue-500 to-blue-400 opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center lg:p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">Hi ? Welcome E-Shop </h1>
              <p className="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign Up{" "}
                </h3>
                <p className="text-gray-500">Please register your account.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div className="flex gap-5">
                    <div className="space-y-2 w-full">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 tracking-wide"
                      >
                        Full Name
                      </label>
                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        type="text"
                        name="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Johan Doe"
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 tracking-wide"
                      >
                        Email
                      </label>
                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mail@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="space-y-2 w-full">
                      <label
                        htmlFor="password"
                        className="mb-5 text-sm font-medium text-gray-700 tracking-wide"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                          type={visible ? "text" : "password"}
                          name="password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                        />
                        {visible ? (
                          <AiOutlineEye
                            className="absolute right-2 top-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(false)}
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            className="absolute right-2 top-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 w-full flex justify-start items-end">
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
                      <div className="mt-2 flex items-center">
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="h-full w-full object-cover rounded-full"
                            />
                          ) : (
                            <RxAvatar className="h-8 w-8" />
                          )}
                        </span>
                        <label
                          htmlFor="file-input"
                          className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <span>Upload a file</span>
                          <input
                            type="file"
                            name="avatar"
                            id="file-input"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileInputChange}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Sign up
                    </button>
                    <div
                      className={`${styles.noramlFlex} w-full flex justify-center mt-2`}
                    >
                      <h4>Already have an account?</h4>
                      <Link to="/login" className="text-blue-600 pl-2">
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>Copyright © 2021-2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup;
