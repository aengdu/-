import {useState, useEffect, Fragment} from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {css} from "@emotion/react";
import { Link } from 'react-router-dom';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faApple, faApplePay} from "@fortawesome/free-brands-svg-icons";


SwiperCore.use([Navigation]);

const swiperOption = {
    spaceBetween: 20,
    slidesPerView: 5,
    navigation: true,
    loop: true,
    breakpoints: {
        1441: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 4,
        },
        876: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        400: {
            slidesPerView: 1,
        },
    },
};

const homeSlider = {
    speed: 1000,
    centeredSlides: true,
    spaceBetween: 20,
    slidesPerView: 4,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        1280: { slidesPerView: 4 },
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        375: { centeredSlides: false, slidesPerView: 1 },
    },
};

function Home() {
    const [foodTop, setFoodTop] = useState([]);
    const [movieTop, setMovieTop] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/jeju/food_top6").then((response) => {
            console.log(response.data);
            setFoodTop(response.data);
        });
    }, []);

    let html = foodTop.map((food) => (
        <li className="one_third">
            <article>
                <a href="#">
                    <img src={food.poster} style={{width: "100%"}}/>
                </a>
                <h6 className="heading">{food.title}</h6>
                <p>{food.addr}</p>
            </article>
        </li>
    ));

    useEffect(() => {
        axios
            .get("http://localhost/movie/movie_top9_react")
            .then((response) => {
                console.log(response.data);
                setMovieTop(response.data);
            });
    }, []);

    const movie = movieTop.map((movie) => (
        <SwiperSlide>
            <div className="centered-slide-content">
                <h6 className="heading">{movie.platform}</h6>
                <img src={movie.image} style={{width: "80%", height: "330px", "border-radius": "10px"}}/>
                <h6 className="heading">{movie.title}</h6>
                <p className="heading">
                    {movie.type} | <span style={{color: "red"}}>{movie.rating}</span>
                </p>
            </div>
        </SwiperSlide>

    ));
    const slideImages = [
        { image: "jeju1.jpg", name: "제주시" },
        { image: "jeju2.jpg", name: "서귀포시" },
        { image: "jeju3.jpg", name: "우도" },
    ];
    return (
        <Fragment>
            <div className="home-image-container">
                {slideImages.map((slide, index) => (
                    <div key={index} className="centered-slide-content">
                        <div className="css-15axuv3">
                            <div>
                                <img
                                    src={`/images/${slide.image}`}
                                    className="css-n2z61w"
                                    alt={slide.name}
                                />
                            </div>
                            <div className="css-cy5urb">
                                <div className="css-10b5t22">{slide.name}</div>
                                <Link to={`jeju/food_list?addr=${slide.name}`}>
                                    <button className="css-hbwec1">
                                        <div className="css-1a1av27">더보기</div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/*<div css={PostStyle}>
                <Swiper {...homeSlider}>
                    {slideImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="centered-slide-content">
                                <img src={`/images/${image}`} style={{ width: "100%", height: "450px" }} />
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </Swiper>
            </div>*/}
            {/*<div className="category">
                <div id="pageintro" className="hoc clear">
                    <span>
                        <i className="fa-solid fa-bowl-food"></i>
                    </span>
                    <div className="categoryname">
                        <span>
                            <FontAwesomeIcon icon={faApplePay} />
                            <FontAwesomeIcon icon={faApple} />
                          <NavLink to={"/jeju/food_find"}>맛집</NavLink>
                        </span>
                    </div>
                    <div className="categoryname">
                        <NavLink to={"/jeju/event_list"}>행사&이벤트</NavLink>
                    </div>
                    <div className="categoryname">
                        <NavLink to={"/news/news_list"}>제주도 뉴스</NavLink>
                    </div>
                </div>
            </div>*/}
            <div className="bgded overlay light">
                <h2 className="css-qnb52w">🛫 제주도 🔥HOT🔥 TOP 6 여행지</h2>
                <section id="services" className="hoc container clear">
                    <ul className="nospace group elements elements-three">{html}</ul>
                </section>
            </div>
            <div className="wrapper row3">
                <main className="hoc container clear">
                    <h2 className="css-qnb52w">
                        🎬 제주도 가면서 볼만한 OTT 🍿
                    </h2>
                    <div className="clear"></div>
                    <div css={PostStyle}>
                        <Swiper {...swiperOption}>{movie}</Swiper>
                    </div>
                </main>
            </div>
        </Fragment>
    );
}

const PostStyle = css`
  z-index: 1;
  display: grid;
  margin: 0 auto;
  gap: 20px;
  width: 80vw;
  height: 100%;

  .swiper-button-next {
    right: 0;
    background-size: 140% auto;
    background-position: center;
    position: absolute;
    border-radius: 50%;
    background-color: red;
    color: white;
  }

  .swiper-button-prev {
    left: 0;
    background-size: 140% auto;
    background-position: center;
    position: absolute;
    border-radius: 50%;
    background-color: red;
    color: white;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

`;

export default Home;
