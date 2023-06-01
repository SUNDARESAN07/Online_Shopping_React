import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import './Header.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import getAccess from '../common/getAccess';

function Header() {
  const location = useLocation();
  const navigate=useNavigate();
  const path=location.pathname;
  var imgStyle = {
    width: 35,
    height: 35,
    padding: 5,
    margin: 5,
    borderRadius: 10
  }
  var linkStyle = {
    textDecoration: 'none',
    alignItems: 'end',
    color: 'white',
    paddingLeft: "2vw"
  }
  var linkStyle1 = {
    textDecoration: 'none',
    alignItems: 'center',
    display:"inline-flex",
    color: 'white',
    paddingLeft: "2vw"
  }
  var titleStyle = {
    alignSelf: 'end',
    margin: 'auto'
  }
  var ButtonStyle={
    color:"white",
    paddingTop:"9px",
    display:"contents"
  }

  var tabStyle = {
    display: "flex",
    padding: "2px",
    alignItems: "end"
  }
 const logout=()=>{
    navigate("/login");
  }

  var getUser = () => {
    var user=localStorage.getItem("auth_user");
    if(!user){
      user="User";
    }
    else{
      user=JSON.parse(user);
      user=user.name;
    }
    return user;
  }
  
  return (
    <header className="App-header">
      <div className='logo'>
        <img src='shop-logo.png' style={imgStyle} alt='appLogo'></img>
        <p style={titleStyle}>Shopping App</p>
      </div>
      <ul style={tabStyle}>
      { (path==="/cart"&&getAccess())? <li><Link to="/product" style={linkStyle}><AiOutlineShoppingCart /> Product</Link></li>:null}
        {(path==="/product"&&getAccess())?<li><Link to="/cart" style={linkStyle}><AiOutlineShoppingCart /> Cart</Link></li>:null}
        {(path!=="/product"&&path!=="/cart") ? <li><Link to="/login" style={linkStyle}><CgProfile /> Login</Link> </li> :
          <li style={linkStyle1}>{getUser()} &nbsp; &nbsp;<Button size="sm" variant="white" style={ButtonStyle} onClick={logout}> Logout<BiLogOut /></Button></li>
          
        }
      </ul>
    </header>
  );
}

export default Header;