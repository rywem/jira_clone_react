import { useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios';
const Login = () => {
    const [inputs, setInputs] = useState({});  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert(inputs.username + " " + inputs.password + " " + inputs.avatarUrl) ;
    axios.post("https://localhost:7260/api/Account/login", inputs)
      .then(response => {
        //this.setState
        console.log("login post ", response);
        this.setState({registerResponse: response.data})
      });
  }
    return (
    <div className="login-form">    
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-primary">Register</h2>
          <div className="form-group row">
            <label>Username</label>
            <input type="text"
              name="username"
              value={inputs.username || ''}
              onChange={handleChange} 
              className="form-control input-element"
              />        
          </div>
          <div className="form-group row">
            <label>Password</label>
            <input type="password"
              name="password"
              value={inputs.password || ''}
              onChange={handleChange} 
              className="form-control input-element"
              />
          </div>           
          <div className="form-group row pt-2">
            <div className="col-2">
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </div>
          </div>
        </form>
    </div>
    )
};
  
export default Login;