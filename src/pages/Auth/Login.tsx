import { useState } from "react";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import { loginUser } from "../../redux/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { DollarSign } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await dispatch(
        loginUser({
          email,
          password,
          first_name: "",
          last_name: "",
        }),
      );

      if (loginUser.fulfilled.match(res)) {
        navigate("/dashboard");
      } else {
        const payload = (res as any).payload;
        if (payload?.message?.toLowerCase().includes("invalid credentials")) {
          setFieldErrors({
            general: "Invalid email or password. Please try again.",
          });
        } else if (payload?.message?.toLowerCase().includes("network")) {
          setFieldErrors({
            general:
              "Network error. Please check your connection and try again.",
          });
        } else {
          setFieldErrors({
            general: payload?.message || "Login failed. Please try again.",
          });
        }
      }
    } catch (err) {
      setFieldErrors({
        general: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center justify-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
          My Budget
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Sign in to your account
        </h2>

        {fieldErrors.general && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {fieldErrors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                fieldErrors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                fieldErrors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              aria-invalid={!!fieldErrors.password}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
