
// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import hamburge from '../asset/hamburge.svg';
// import leftmenu from '../asset/leftmenu.svg';
// import '../index.css';

// const CustomNavbar = () => {
//     return (
//     <header className="border-bottom py-3 bg-white">
//         <Container fluid className="px-4">
//             <Row className="align-items-left justify-content-between">
//           {/* Left: Hamburger (Mobile Only) */}
//                 <Col xs="auto" className="d-lg-none">
//                     <img src={hamburge} alt="Menu" style={{ width: '24px' }} />
//                 </Col>

//           {/* Center: Logo / Brand */}
//                 <Col className="brand">
//                     <a href="#home" className="brand-logo">
//                         Kyiv <br></br> LuxeBouquets<sup>®</sup>
//                     </a>
//                 </Col>

//           {/* Right: Icon */}
//                 <Col xs="auto">
//                     <img src={leftmenu} alt="User Menu" style={{ width: '24px' }} />
//                 </Col>
//             </Row>
//         </Container>
//     </header>
// );
// };

// export default CustomNavbar;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import hamburge from '../asset/hamburge.svg';
import leftmenu from '../asset/leftmenu.svg';
import '../index.css';

const CustomNavbar = () => {
    return (
        <header className="border-bottom py-3 bg-white">
            <Container fluid className="px-4">
                <Row className="align-items-start justify-content-between">
                    {/* Left: Hamburger and Logo */}
                    <Col xs="auto" className="d-lg-none text-left">
                        <div className="hamburger-logo">
                            <img src={hamburge} alt="Menu" style={{ width: '24px' }} />
                            <a href="#home" className="brand-logo d-block mt-2">
                                Kyiv <br /> LuxeBouquets<sup>®</sup>
                            </a>
                        </div>
                    </Col>

                    {/* Right: Icon */}
                    <Col xs="auto">
                        <img src={leftmenu} alt="User Menu" style={{ width: '24px' }} />
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default CustomNavbar;