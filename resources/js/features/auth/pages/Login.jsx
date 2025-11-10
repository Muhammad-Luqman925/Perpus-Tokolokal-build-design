import "@/assets/styles/pages/Login.css";
import { useStore } from "@/core/store";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "@/core/api/axios";

const illustrationSrc = "/img/Login.png";

const Login = ({ className = "", ...props }) => {
  const rootClassName = ["halaman-login-user", className].filter(Boolean).join(" ");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const location = useLocation();
  const isRegisterMode = mode === "register";

  useEffect(() => {
    if (location.state?.mode === "register") {
      setMode("register");
    } else if (location.state?.mode === "login") {
      setMode("login");
    }
  }, [location.state]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") || "").trim();
    const password = (formData.get("password") || "").trim();

    if (!email || !password) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      setLoading(true);
      const payload = { email, password };
      const res = await http.post("/customer/login", payload);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("customer", JSON.stringify(res.data.customer));

        dispatch({
          type: "LOGIN",
          payload: {
            user: res.data.customer,
            token: res.data.token,
          },
        });

        alert("Login successful!");
        navigate(location.state?.redirectTo || "/", { replace: true });
      } else {
        alert(res.data.message || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Please check your email and password.");
    } finally {
      setLoading(false);
    }

    form.reset();
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") || "").trim();
    const email = (formData.get("email") || "").trim();
    const password = (formData.get("password") || "").trim();

    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);
      const payload = { name, email, password };
      const res = await http.post("/customer/register", payload);

      if (res.status === 201) {
        alert("Registration successful! Please login now.");
        setMode("login");
      } else {
        alert(res.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }

    form.reset();
  };

  const handleRegisterRedirect = () => setMode("register");
  const handleForgotPassword = () => navigate("/forgot-password");
  const handleSellerRedirect = () => navigate("/admin/login");
  const handleSellerSignUp = () => navigate("/seller/register");
  const handleClose = () => navigate(-1);
  const handleBackToLogin = () => setMode("login");

  return (
    <div className={rootClassName} {...props}>
      <div className="login-card">
        <div className="login-card__left">
          <div className="login-copy">
            <h1 className="login-title">
              Hi, welcome <span className="login-title__emoji">??</span>!
            </h1>
            <p className="login-subtitle">
              New day, new arrivals. Sign in and find your dream product today!
            </p>
          </div>

          <form
            className="login-form"
            autoComplete="off"
            onSubmit={isRegisterMode ? handleSignUpSubmit : handleLoginSubmit}
          >
            {isRegisterMode && (
              <div className="form-group">
                <label className="form-label" htmlFor="register-name">
                  Full Name
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name..."
                  autoComplete="off"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="login-identifier">
                Email
              </label>
              <input
                id="login-identifier"
                name="email"
                type="email"
                placeholder="Enter email..."
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter password..."
                autoComplete="new-password"
              />
              {!isRegisterMode && (
                <div className="form-helper">
                  <button type="button" className="link-button" onClick={handleForgotPassword}>
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Please wait..." : isRegisterMode ? "Sign Up" : "Login"}
            </button>

            {!isRegisterMode && (
              <>
                <div className="divider">
                  <span>or</span>
                </div>
                <button type="button" className="register-btn" onClick={handleRegisterRedirect}>
                  Register
                </button>
              </>
            )}
          </form>

          {!isRegisterMode ? (
            <p className="seller-disclaimer">
              Are you a <span className="seller-word">Seller</span>?{" "}
              <button type="button" className="link-button" onClick={handleSellerRedirect}>
                Login
              </button>{" "}
              or{" "}
              <button type="button" className="link-button" onClick={handleSellerSignUp}>
                Sign up here
              </button>
            </p>
          ) : (
            <p className="seller-disclaimer seller-disclaimer--register">
              Already have an account?{" "}
              <button type="button" className="link-button" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </p>
          )}
        </div>

        <div className="login-card__right" aria-hidden="true">
          <button type="button" className="close-button" aria-label="Close" onClick={handleClose}>
            &times;
          </button>
          <div className="illustration__frame">
            <img className="illustration__image" src={illustrationSrc} alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
export default Login;
