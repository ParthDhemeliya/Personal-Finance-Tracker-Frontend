import { useState } from "react";
import { DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import { registerUser } from "../../redux/auth/authThunk";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    const resultAction = await dispatch(
      registerUser({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      }),
    );

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <DollarSign className="h-8 w-8 me-2 text-blue-600" />
          My Budget
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <input
                type="text"
                name="first_name"
                id="first_name"
                onChange={handleChange}
                value={form.first_name}
                required
                placeholder="First Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <input
                type="text"
                name="last_name"
                id="last_name"
                onChange={handleChange}
                value={form.last_name}
                required
                placeholder="Last Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email}
                required
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password}
                required
                placeholder="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
                required
                placeholder="confirm password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Create an account
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="font-medium text-blue-600 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
