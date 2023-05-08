import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
    return (
        <div className="header-wrapper">
            <header className="header-container">
                <div className="logo-container">
                    <h1>
                        <NavLink to={"/"}>놀당 갑서</NavLink>
                    </h1>
                </div>
                <nav className="nav-container">
                    <ul>
                        <li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
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