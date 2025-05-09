import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast,{Toaster} from 'react-hot-toast';
import "./Login.css";

const Login=( {setIsLoggedIn, setFormValues, formValues,setLoggedInUser} )=> {
  // const [username, setUsername] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const [submitValue, onSubmitValue] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange=(e)=>{
    const {name, value}= e.target;
    setFormValues({...formValues, [name]:value});
  };
  const handleSubmit = async (e) => {
    onSubmitValue(true);
    // setFormErrors(validate(formValues));
    e.preventDefault();
    const errors = validate(formValues);
  setFormErrors(errors);

  if (Object.keys(errors).length > 0) {
    return; // Stop if there are validation errors
  }
    // console.log(username, password);
    // console.log("FormValues",formValues)
    const body = JSON.stringify({
      userName: formValues.username,
      email: formValues.email,
      password: formValues.password,
    });
    
    const signUpSubmit = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/sign-up`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: body,
    });
    const signUpResponse = await signUpSubmit.json();
    // console.log("signInRes", signUpResponse);
    if (signUpResponse.error.isError) {
      toast.error(signUpResponse.error.message);
    } else {
        setIsLoggedIn(true); 
        navigate("/");
        setLoggedInUser(formValues.username); // ✅ Save logged-in username
        setFormValues({ username: "", email: "", password: "" }); // ✅ Clear form
    }
  };
  if (submitValue) {
    <Link to="/"></Link>;
  }
  const validate=(values)=>{
    const errors ={};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.username){
      errors.username = "User name is required"
    }
    if(!values.email){
      errors.email="Email is required"
    }
     if(!values.password){
      errors.password ="Password is required"
    }else if (values.password.length<4){
      errors.password = "Password should be more than 4 characters"
    }
    return errors;
  }

  return (
    <div className=" login-container">
        <Toaster/>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="heading">Sign Up</h2>
        <div className="d-flex flex-column">
          <label className="label-name">User Name :</label>
          <input
            className="input-type"
            name="username"
            type="text"
            value={formValues.username} 
            onChange={handleChange}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <p style={{color:"red"}}>{formErrors.username}</p>
        </div>
        <div className="d-flex flex-column">
          <label className="label-name">Email :</label>
          <input
            className="input-type"
            name="email"
            type="email"
            value={formValues.email} onChange={handleChange}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{color:"red"}}>{formErrors.email}</p>
        </div>
        <div className="d-flex flex-column">
          <label className="label-name">Password :</label>
          <input
            className="input-type"
            name="password"
            type="password"
            value={formValues.password} onChange={handleChange}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{color:"red"}}>{formErrors.password}</p>
        </div>
        <button className="bg-primary login-btn" type="submit">
          Sign Up
        </button>
        {/* {submitValue && <Link to="/">Home</Link>} */}
      </form>
    </div>
  );
}
export default Login;
