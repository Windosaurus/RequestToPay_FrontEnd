/* Header is the top bar on the page holding the Scotia logo and menu hamburger */

import React, {Component} from "react";
import './Header.css'

export class Header extends Component {
    render(){
        return (
            <div id="header_block">
                <div id="header_scotia">
                    Scotia
                </div>
                <div id="header_menu">

                </div>
            </div>
        );
    }
}

export default Header;
