import {Fragment,useState,useEffect} from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import FoodList from "./components/food/FoodList";
import EventList from "./components/food/EventList";
import FoodDetail from "./components/food/FoodDetail";
import FoodFind from "./components/food/FoodFind";
import NewsList from "./components/news/NewsList";
import $ from "jquery"

import ChatMain from "./ChatMain";


// <Route path={"/jeju/food_detail/:no"} element={<FoodDetail/>}/> => PathVariable
function App() {
    useEffect(
        ()=>{
        /*$('div#chat').toggleClass('active');*/
        var $win = $(window);
        var top = $(window).scrollTop(); // 현재 스크롤바의위치값을 반환합니다.

        /*사용자 설정 값 시작*/
        var speed          = 1000;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
        var easing         = 'linear'; // 따라다니는 방법 기본 두가지 linear, swing
        var $layer         = $('div#chat_container'); // 레이어셀렉팅
        var layerTopOffset = 0;   // 레이어 높이 상한선, 단위:px
        $layer.css('position', 'absolute');
        /*사용자 설정 값 끝*/

        // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
        if (top > 0 )
            $win.scrollTop(layerTopOffset+top);
        else
            $win.scrollTop(0);

        //스크롤이벤트가 발생하면
        $(window).scroll(function(){

            var yPosition = $win.scrollTop()+300;
            if (yPosition< 0)
            {
                yPosition = $win.scrollTop()+300;
            }
            $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
        });

    })
  return (
     <Router>
       <Fragment>
         <Header/>
         <Routes>
             <Route exact path={"/"} element={<Home/>}/>
             <Route path={"/jeju/food_list"} element={<FoodList/>}/>
             <Route path={"/jeju/event_list"} element={<EventList/>}/>
             <Route path={"/jeju/food_detail/:no"} element={<FoodDetail/>}/>
             <Route path={"/jeju/food_find"} element={<FoodFind/>}/>
             <Route path={"/news/news_list"} element={<NewsList/>}/>
         </Routes>

         <Footer/>
           {/*<ChatMain/>*/}
       </Fragment>
     </Router>
  );
}

export default App;
