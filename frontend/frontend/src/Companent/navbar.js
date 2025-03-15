import { Link} from 'react-router-dom';
import hamburger from '../Asset/hamburger.svg';
import cart from '../Asset/cart.svg';


import './navbar.css';

const Navbar = () => {
    return ( 
        <header className="container">
        <div className="icon">
            <img src={hamburger} alt="hamburger" />
            <img src={cart} alt= "cart" />
        </div>
            <Link to='/' className='nav-links'>
                <h1>Shope</h1>
            </Link>
            <Link to='/' className='nav-links'>
                <h1>Contact</h1>
            </Link>
            <Link to='/' className='nav-links'>
                <h1>SingIn</h1>
            </Link>
            <Link to='/' className='nav-links'>
                <h1>Cart</h1>
            </Link>
        </header>
    );
}
 
export default Navbar;