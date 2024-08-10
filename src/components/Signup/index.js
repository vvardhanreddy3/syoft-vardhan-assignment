import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

const Signup = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    zipcode: "",
    acceptPrivacyPolicy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [backendErr, setBackendErr] = useState({ showErr: false, errMsg: "" });

  const navigate = useNavigate();

  useEffect(() => {
    formValidation(form);
  }, [form]);

  const formValidation = (form) => {
    const isValidPhoneNumber = /^\d{10}$/.test(form.phone);
    const isValidZipcode = /^\d{6}$/.test(form.zipcode);

    if (
      form.firstname !== "" &&
      form.lastname !== "" &&
      form.email !== "" &&
      form.password !== "" &&
      form.city !== "" &&
      isValidPhoneNumber &&
      isValidZipcode &&
      form.acceptPrivacyPolicy
    ) {
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

    try {
      const url =
        "https://syoft.dev/Api/user_registeration/api/user_registeration";
      const payload = {
        user_firstname: form.firstname,
        user_lastname: form.lastname,
        user_email: form.email,
        user_phone: form.phone,
        user_password: form.password,
        user_city: form.city,
        user_zipcode: form.zipcode,
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

      if (response.ok && data.success) {
        navigate("/login");
      } else {
        setBackendErr({ showErr: true, errMsg: data.msg });

        setTimeout(() => {
          setBackendErr({ showErr: false, errMsg: "" });
        }, 2000);
      }
    } catch (err) {
      setBackendErr({ showErr: true, errMsg: err.message });

      setTimeout(() => {
        setBackendErr({ showErr: false, errMsg: "" });
      }, 2000);
    }
  };

  const handlOnClickPasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const handleOnClickCheckbox = (event) => {
    setForm({
      ...form,
      acceptPrivacyPolicy: event.target.checked,
    });
  };

  return (
    <div className="signup-page__bg-container">
      <form onSubmit={handleOnSubmit} className="signup-page__form-container">
        <h1>Sign up</h1>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="signup-page__link-items">
            Sign in
          </Link>
        </p>

        <label htmlFor="firstname">First name *</label>
        <input
          type="text"
          name="firstname"
          value={form.firstname}
          onChange={handleOnChangeInput}
        />

        <label htmlFor="lastname">Last name *</label>
        <input
          type="text"
          name="lastname"
          value={form.lastname}
          onChange={handleOnChangeInput}
        />

        <label htmlFor="email">Email address *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleOnChangeInput}
        />

        <div className="signup-page__password-wrapper">
          <label htmlFor="password">Password *</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleOnChangeInput}
          />
          <button type="button" onClick={handlOnClickPasswordIcon}>
            {showPassword ? (
              <IoEyeOffSharp className="signup-page__password-icons" />
            ) : (
              <IoEye className="signup-page__password-icons" />
            )}
          </button>
        </div>

        <label htmlFor="phone">Phone Number *</label>
        <input
          type="number"
          name="phone"
          value={form.phone}
          onChange={handleOnChangeInput}
        />

        <label htmlFor="city">City *</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleOnChangeInput}
        />

        <label htmlFor="zipcode">Zipcode *</label>
        <input
          type="number"
          name="zipcode"
          value={form.zipcode}
          onChange={handleOnChangeInput}
        />

        <div className="signup-page__checkbox-and-policy-wrapper">
          <input
            type="checkbox"
            name="acceptPrivacyPolicy"
            checked={form.acceptPrivacyPolicy}
            onChange={handleOnClickCheckbox}
          />
          <p>
            I agree to the{" "}
            <Link className="signup-page__link-items">Terms of Service</Link>{" "}
            and <Link className="signup-page__link-items">Privacy Policy</Link>
          </p>
        </div>

        {backendErr.showErr && (
          <p className="signup-page__err-msg">*{backendErr.errMsg}</p>
        )}

        <button
          disabled={disableSubmitBtn}
          className={
            disableSubmitBtn
              ? "signup-page__submit-btn-disabled"
              : "signup-page__submit-btn"
          }
          type="submit"
        >
          Create your free account
        </button>
      </form>
    </div>
  );
};

export default Signup;
