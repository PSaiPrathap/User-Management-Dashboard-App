import userlogo from "./userlogo.png"
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <div className="nav-content1 d-flex justify-content-center">
        <img className="logo" src={userlogo} alt="logo"  />
        <h1 className='title pt-4 text-primary'>User Dashboard</h1>
      </div>
      <div className="nav-content2 text-primary">
        <button className="loginButton btn btn-primary">Login/Signin</button>
      </div>
    </div>
  </nav>
)

export default Header
