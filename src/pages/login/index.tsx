import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuthStore from "../../store/authStore";
import {useEffect} from "react";

const Login = () => {
  const { isAuthenticated, login, redirect_to } = useAuthStore();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle Form Submission
  const handleLogin = async (values: { email: string; password: string }, { setSubmitting, setErrors }: any) => {
    const success = await login(values.email, values.password);
    if (success) {
     console.log('Loggedin')
    } else {
      setErrors({ general: "Invalid email or password" });
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (isAuthenticated && redirect_to) {
      debugger;
      navigate(redirect_to)
    }
  }, [isAuthenticated, redirect_to]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
        <h2 className="text-center mb-4">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {/* Error Message for Invalid Login */}
              {/*{errors.general && <p className="text-danger text-center">{errors.general}</p>}*/}

              {/* Email Field */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              {/* Login Button */}
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
