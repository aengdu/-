import {useState,useEffect,Fragment} from "react";
import Header from "./Header";
import axios from "axios";

function Footer() {
    const[newsList,setNewsList]=useState([])
    const[title,setTitle]=useState('제주도')
    const[recipeList,setFoodList]=useState([])
    const[locationList,setLocationList]=useState([])

    useEffect(()=>{
        axios.get("http://localhost/news/news_aop_react", {
            params:{
                title:title
            }
        }).then(response=>{
            console.log(response.data)
            setNewsList(response.data)
        })
    },[])
    useEffect(()=>{
        axios.get("http://localhost/jeju/location_top9_react").then(response=> {
            console.log(response.data)
            setLocationList(response.data)
        })
    },[])
    useEffect(()=>{
        axios.get("http://localhost/jeju/food_top9_react").then(response=> {
            console.log(response.data)
            setFoodList(response.data)
        })
    },[])
    let html=newsList.map((news)=>
        <li><a href={news.link} target={"_blank"} dangerouslySetInnerHTML={{__html:news.title}}></a></li>
    )
    let location=locationList.map((location)=>
        <li>
            <a href={location.url} target={"_blank"}>
                <img src={location.poster}/>
                <span>{location.title}</span>
            </a>
        </li>
    )
    let food=recipeList.map((food)=>
        <li>
            <a href={food.url} target={"_blank"}>
                <img src={food.poster} style={{width: "92px", height: "92px"}}/>
                <span>{food.title}</span>
            </a>
        </li>
    )
    return (
        <Fragment>
            <div className="bgded overlay row4">
                <footer id="footer" className="hoc clear">
                    <div className="one_third first">
                        <h6 className="heading">오늘의 제주도 뉴스</h6>
                        <ul className="nospace linklist">
                            {html}
                        </ul>
                    </div>
                    <div className="one_third">
                        <h6 className="heading"> 제주 명소 Top 9</h6>
                        <ul className="nospace clear latestimg">
                            {location}
                        </ul>
                    </div>
                    <div className="one_third">
                        <h6 className="heading">오늘의 맛집 Top 9</h6>
                        <ul className="nospace clear latestimg">
                            {food}
                        </ul>
                    </div>
                </footer>
            </div>
            <div className="wrapper row5">
                <div id="copyright" className="hoc clear">
                    <p className="fl_left">Copyright &copy; 2023-03-23 - 강남 쌍용 교육센터 - <a href="#">조성민</a></p>
                    <p className="fl_right">git Address : <a href="https://github.com/aengdu" target={"_blank"}>https://github.com/aengdu</a></p>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer;