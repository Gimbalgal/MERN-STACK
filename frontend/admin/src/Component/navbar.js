import { Link } from "react-router-dom";
import hamburge from '../asset/hamburge.svg'
import leftmenu from '../asset/leftmenu.svg'
import '../index.css'

const Navbar = () => {
    return (  
        <div className="nav">
            <div className="nav-menu">
                <img src={hamburge} className="hamburge" alt="" />
                <img src={leftmenu} className="leftmenu" alt="" />
            </div>
            <div className="nav-logo">
                <h1>Kyiv <br></br> LuxeBouquets®</h1>
            </div>
                
        
        </div>
        
    );
}

export default Navbar;
