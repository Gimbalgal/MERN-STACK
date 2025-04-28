import { Link } from "react-router-dom";
import hamburge from '../asset/hamburge.svg'
import leftmenu from '../asset/leftmenu.svg'
import '../index.css'

const Navbar = () => {
    return (  
        <div className="nav">

            <div className="menu">
                <div className="icon">
                    <img src={hamburge} className="left" alt="" />
                    <img src={leftmenu} className="right" alt="" />
                </div>
                <Link to="/" className="link">Kyiv <br></br>LuxeBouquets®</Link>
                
            </div>
        </div>
    );
}
 
export default Navbar;
