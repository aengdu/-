import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";

function Header(props) {
    return (
        <div className="header-wrapper">
            <header className="header-container">
                <a href="/" className="logoa"><img className="logoimg" src={"/images/noldang.png"}/></a>
                <nav className="nav-container">
                    <ul>
                        {/*<li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/jeju/food_list"}>맛집</NavLink>
                        </li>*/}
                        <li>
                            <NavLink to={"/jeju/food_find"}>맛집 검색</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/jeju/event_list"}>행사&이벤트</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/news/news_list"}>뉴스 검색</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;