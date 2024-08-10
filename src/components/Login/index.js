import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [backendErr, setBackendErr] = useState({ showErr: false, errMsg: "" });

  const navigate = useNavigate();

  useEffect(() => {
    formValidation(form);
  }, [form]);

  const formValidation = (form) => {
    if (form.email !== "" && form.password !== "") {
      setDisableSubmitBtn(false);
    } else {
      setDisableSubmitBtn(true);
    }
  };

  const handleOnChangeInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(form);

    try {
      const url = "https://syoft.dev/Api/userlogin/api/userlogin";
      const payload = {
        user_email: form.email,
        user_password: form.password,
      };

      const options = {
        method: "POST",
        headers: {
          "Contetnt-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      console.log(data);

      if (response.ok && data.status) {
        const userDetails = data.user_data[0];

        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        navigate("/");
      } else {
        setBackendErr({ showErr: true, errMsg: data.msg });

        setTimeout(() => {
          setBackendErr({ showErr: false, errMsg: "" });
        }, 2000);
      }
    } catch (err) {
      setBackendErr({ showErr: true, errMsg: err.msg });

      setTimeout(() => {
        setBackendErr({ showErr: false, errMsg: "" });
      }, 2000);
    }
  };

  const handlOnClickPasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleOnSubmit} className="login-form">
        <h2>Login Form</h2>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleOnChangeInput}
            placeholder="Email Address"
            required
          />
        </div>
        <div className="login-page__password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleOnChangeInput}
            placeholder="Password"
          />
          <button type="button" onClick={handlOnClickPasswordIcon}>
            {showPassword ? (
              <IoEyeOffSharp className="login-page__password-icons" />
            ) : (
              <IoEye className="login-page__password-icons" />
            )}
          </button>
        </div>
        <div className="options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="/signup">Forgot password?</a>
        </div>
        <button
          disabled={disableSubmitBtn}
          className="login-button"
          type="submit"
        >
          Login
        </button>

        <p>
          Not a member? <a href="/signup">Signup now</a>
        </p>
        {backendErr.showErr && (
          <p className="login-page__err-msg">*{backendErr.errMsg}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
