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

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!form.first_name.trim()) errors.first_name = "First name is required.";
    if (!form.last_name.trim()) errors.last_name = "Last name is required.";
    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Invalid email address.";
    }

    if (!form.password) errors.password = "Password is required.";
    else if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    if (!form.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
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
        const payload = (resultAction as any).payload;

        if (payload?.errors && Array.isArray(payload.errors)) {
          const serverErrors: { [key: string]: string } = {};
          payload.errors.forEach((err: { field: string; message: string }) => {
            serverErrors[err.field] = err.message;
          });
          setFieldErrors(serverErrors);
        } else if (payload?.message) {
          const msg = payload.message.toLowerCase();
          if (msg.includes("user already exists")) {
            setFieldErrors({
              email:
                "An account with this email already exists. Please login or use a different email.",
            });
          } else {
            setFieldErrors({ general: payload.message });
          }
        } else {
          setFieldErrors({
            general: "An unexpected error occurred. Please try again.",
          });
        }
      }
    } catch (error) {
      setFieldErrors({
        general: "Network error. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
          My Budget
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Create an Account
        </h2>

        {fieldErrors.general && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {fieldErrors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {[
            {
              name: "first_name",
              type: "text",
              placeholder: "First Name",
            },
            {
              name: "last_name",
              type: "text",
              placeholder: "Last Name",
            },
            {
              name: "email",
              type: "email",
              placeholder: "Email",
            },
            {
              name: "password",
              type: "password",
              placeholder: "Password",
            },
            {
              name: "confirmPassword",
              type: "password",
              placeholder: "Confirm Password",
            },
          ].map(({ name, type, placeholder }) => (
            <div key={name}>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  fieldErrors[name]
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!fieldErrors[name]}
              />
              {fieldErrors[name] && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create an Account"}
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
