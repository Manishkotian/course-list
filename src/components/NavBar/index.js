import React from 'react';
import { Navbar} from 'react-bootstrap';

const NavBarComponent = (props) => {
    return (
        <React.Fragment>
            <Navbar bg={props.color} variant={props.variant}>
                <Navbar.Brand>
                    {props.title}
                </Navbar.Brand>
            </Navbar>
        </React.Fragment>       
    );
};
export default NavBarComponent;


