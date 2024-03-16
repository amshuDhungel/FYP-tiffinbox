import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdate,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* for update page username start */}
        {profileUpdate && (
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
              placeholder="Enter username"
            />
          </div>
        )}
        {/* for update page username end */}
        {/* for about page username start */}
        {/* About */}
        {profileUpdate && (
          <div className="mb-4">
            <label
              htmlFor="about"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              About
            </label>
            <input
              id="about"
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 p-2 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
              placeholder="Enter About"
            />
          </div>
        )}
        {/* for about page username end */}

        {/* Name */}
        {page !== "login" && (
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
              placeholder="Enter your Name"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
            placeholder="Enter your Email"
            disabled={profileUpdate}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
            placeholder="Enter your Password"
          />
        </div>
        {/* question */}
        {page !== "login" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="question"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pick a question
              </label>
              <select
                id="question"
                className="mt-1 p-2 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
              >
                <option>What is your favourite color?</option>
                <option>What is your Best friend name?</option>
                <option>What city were you born in?</option>
              </select>
              <small className="block text-sm text-gray-500">
                You can use this to reset your password if you've forgotten it.
              </small>
            </div>
            {/* wirte answer */}
            <div className="mb-4">
              <input
                id="answer"
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="mt-1 p-2 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
                placeholder="Write your answer here"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <button
            disabled={
              profileUpdate
                ? loading
                : page === "login"
                ? !email || !password
                : !name || !email || !password || !secret
            }
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
