import {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";
import {NavLink, useLocation} from "react-router-dom";

// URL에서 쿼리 파라미터를 가져오는 함수

function FoodList() {
    const [foodList, setFoodList] = useState([])
    const [curpage, setCurpage] = useState(1)
    const [totalpage, setTotalpage] = useState(0)
    const [startPage, setStartPage] = useState(0)
    const [endPage, setEndPage] = useState(0)
    const [cookList, setCookList] = useState([])

    const {search} = useLocation(); // search 값을 가져옵니다.
    const query = new URLSearchParams(search);
    const addr = query.get("addr") || "";


    let cookie = document.cookie.split(";");
    let cc = []
    for (let i = 0; i < cookie.length; i++) {

        let a = cookie[i];
        //alert(a);
        //if(a.startsWith("jeju"))
        //{
        let b = a.substring(a.indexOf("=") + 1)
        cc.push(b.trim())
        //alert(cc)
        //}

    }
    /*let m = cc.map((mm, index) =>
        <li className={index % 4 == 0 ? 'one_quarter first' : 'one_quarter'}>
            <img src={mm}/>
        </li>

    )*/
    useEffect(() => {
        // cityName을 기준으로 API 호출
        axios.get("http://localhost/jeju/food_list", {
            params: {
                addr: addr,
                page: curpage
            }
        }).then(response => {
            console.log(response.data)
            setFoodList(response.data); // API 응답 데이터를 state에 저장
        })
        axios.get("http://localhost/jeju/jeju_cookie_react").then(response => {
            console.log(response.data)
            setCookList(response.data)
        })

    }, [addr]); // cityName 값이 변경되면 effect가 다시 실행됨
    useEffect(() => {
        axios.get("http://localhost/jeju/food_page_react", {
            params: {
                page: curpage
            }
        }).then(response => {
            console.log(response.data)
            setTotalpage(response.data.totalpage)
            setCurpage(response.data.curpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        })

    }, {})
    // 이벤트 처리
    const pages = (page) => {
        axios.get("http://localhost/jeju/food_list", {
            params: {
                addr: addr,
                page: page
            }
        }).then(response => {
            console.log(response.data)
            setFoodList(response.data)
        })
        axios.get("http://localhost/jeju/food_page_react", {
            params: {
                page: page
            }
        }).then(response => {
            console.log(response.data)
            setTotalpage(response.data.totalpage)
            setCurpage(response.data.curpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        })
    }
    const pageChange = (page) => {

        pages(page)
    }
    const pagePrev = () => {

        pages(startPage - 1)
    }
    const pageNext = () => {

        pages(endPage + 1)
    }
    let html = foodList.map((food, index) =>
        <li
            className={[
                "food_Find_list_item",
                index % 4 === 0 ? "one_quarter first" : "one_quarter",
            ].join(" ")}
        >
            <NavLink to={"/jeju/food_detail/" + food.no}>
                <img src={food.poster} title={food.title}/>
                <h6 className="heading">{food.title}</h6>
            </NavLink>
        </li>
    )
    let m = cc.map((mm, index) =>
        <li className={[
                "food_Find_list_item",
                index % 4 == 0 ? 'one_quarter first' : 'one_quarter'
            ].join(" ")}
        >
            <img src={mm}/>
        </li>

    )
    let row = [];
    if (startPage > 1) {
        row.push(<li><a href="#"
                        onClick={() => pagePrev(startPage > 1 ? startPage - 1 : startPage)}>&laquo; Previous</a></li>)
    }
    for (let i = startPage; i <= endPage; i++) {
        if (i == curpage) {
            row.push(<li className="current"><strong><a href={"#"} onClick={() => pageChange(i)}>{i}</a></strong></li>)
        } else {
            row.push(<li><a href={"#"} onClick={() => pageChange(i)}>{i}</a></li>)
        }
    }
    if (endPage < totalpage) {
        row.push(<li><a href="#" onClick={() => pageNext(endPage < totalpage ? endPage + 1 : endPage)}>Next &raquo;</a>
        </li>)
    }
    return (
        <div className="food_Find_wrapper row3">
            <main className="food_Find_main hoc container clear">
                <div className="content food_Find_content">
                    <div id="gallery">
                        <figure>
                            <header className="heading">{addr} 맛집</header>
                            <ul className="nospace clear food_Find_list">
                                {html}
                            </ul>
                        </figure>
                    </div>
                    <nav className="pagination">
                        <ul>
                            {row}
                        </ul>
                    </nav>
                </div>
                <div className="content">
                    <div id="gallery">
                        <figure>
                            <header className="heading">최근 방문 맛집</header>
                            <ul className="nospace clear">
                                {m}
                            </ul>

                        </figure>
                    </div>
                </div>
                <div className="clear"></div>
            </main>
        </div>
    )
}

export default FoodList;