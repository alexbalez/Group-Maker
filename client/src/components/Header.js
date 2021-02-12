import React, { Component } from 'react';
import './components.css';


class Header extends Component {
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
    }

    render() {
        return (
            <div className="text-center bg-primary text-white mb-0 pb-0">
                <a href="/mock" className="text-decoration-none text-white"><h1 className="p-2">Group Maker</h1></a>
            </div>
        );
    }


}

export default Header;