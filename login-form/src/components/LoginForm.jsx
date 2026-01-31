import { useState } from 'react'
import './LoginForm.css'
function LoginForm() {

  const [showPassword, setShowpassword] = useState(true);

  return (
    <>
      <p className="heading">
        Hello, welcome to my website
      </p>

      <div>
        <input
          type="text"
          placeholder="Email"
          className="input-field"
        />
      </div>

      <div>
        <input
          type={
            showPassword === true ?
              "text" :
              "password"
          }
          placeholder="Password"
          className="input-field"
        />
        <button onClick={
          () => {
            showPassword === true ?
              setShowpassword(false) :
              setShowpassword(true)
            console.log(showPassword);
          }}>

          Hide
        </button>
      </div>

      <button className="buttons">Login</button>
      <button className="buttons">Sign up</button>
    </>
  );
}
export default LoginForm;
