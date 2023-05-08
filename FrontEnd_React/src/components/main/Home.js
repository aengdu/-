import {useState, useEffect, Fragment} from "react";
import axios from "axios";
function Home(){
    const [foodTop,setFoodTop]=useState([])
    // 서버연결후 데이터 읽기
    useEffect(()=>{
       axios.get("http://localhost/jeju/food_top6").then(response=>{
           console.log(response.data)
           setFoodTop(response.data)
       })
    },[])
    let html=foodTop.map((food)=>
        <li className="one_third">
            <article><a href="#"><img src={food.poster} style={{"width":"100%"}}/> </a>
                <h6 className="heading">{food.title}</h6>
                <p>{food.addr}</p>
            </article>
        </li>
    )
    return (
        <Fragment>
        <div className="bgded overlay">
            <div id="pageintro" className="hoc clear">

                <article>
                    <h3 className="heading">제주 맛집 여행</h3>


                </article>

            </div>
        </div>
            <div className="wrapper row3">
                <main className="hoc container clear">

                    <section id="introblocks">
                        <ul className="nospace group btmspace-80 elements elements-four">
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-hand-rock"></i></a>
                                    <h6 className="heading">오늘의 날씨</h6>

                                </article>
                            </li>
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-dove"></i></a>
                                    <h6 className="heading">오늘의 뉴스</h6>

                                </article>
                            </li>
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-history"></i></a>
                                    <h6 className="heading">추천 여행</h6>

                                </article>
                            </li>
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-heartbeat"></i></a>
                                    <h6 className="heading">추천 맛집</h6>

                                </article>
                            </li>
                        </ul>
                    </section>
                    <div className="clear"></div>
                </main>
            </div>
            <div className="bgded overlay light">
                <h2 className="css-qnb52w">🛫 제주도 🔥HOT🔥 TOP 6 여행지</h2>
                <section id="services" className="hoc container clear">

                    <ul className="nospace group elements elements-three">
                        {html}
                    </ul>
                </section>
            </div>
        </Fragment>
    )
}
export default Home;