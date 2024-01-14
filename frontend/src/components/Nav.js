import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <img
        className='app-logo'
        alt='app-logo'
        src='https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png'
      />
      <ul className="nav-ul">
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/state" >States</Link></li>
        <li><Link to="/cities" >Cities</Link></li>
        <li><Link to="/vendor" >Vendors</Link></li>
        <li><Link to="/customer-list" >Customers</Link></li>
        <li><Link to="/profile" >Profile</Link></li>
        <li><Link to="/signup" >Logout</Link></li>
        <li className='nav-right'><Link to="/signup" >Sign Up</Link></li>
        <li className='nav-right'><Link to="/login" >Login</Link></li>
      </ul>
    </div>
  )
}

export default Nav;