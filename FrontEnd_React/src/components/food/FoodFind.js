// 필요한 모듈 및 라이브러리를 import 합니다.
import {useEffect, useState} from "react"; // 리액트의 useEffect와 useState 훅을 사용하기 위해 불러옵니다.
import axios from "axios"; // HTTP 요청을 처리하기 위한 라이브러리인 axios를 불러옵니다.
import {NavLink} from "react-router-dom"; // 웹 페이지 네비게이션을 위한 리액트 라우터 라이브러리 중 NavLink를 불러옵니다.


// axios 요청을 별도의 함수로 분리하여 코드의 가독성을 높이고 코드 중복을 줄입니다.
const fetchFoodData = async (page, title) => {
    const response = await axios.get("http://localhost/jeju/food_find_react", {
        params: {
            page,
            title,
        },
    });
    return response.data;
};


// 함수형 컴포넌트 FoodFind 정의
function FoodFind() {
    // 상태값 설정
    const [ss, setSs] = useState("제주"); // 검색어를 관리하는 상태값과 셋터 함수를 생성합니다.
    const [fdata, setFdata] = useState([]); // 음식 데이터를 관리하는 상태값과 셋터 함수를 생성합니다.
    const [curpage, setCurpage] = useState(1); // 현재 페이지를 관리하는 상태값과 셋터 함수를 생성합니다.
    const [totalpage, setTotalpage] = useState(0); // 전체 페이지를 관리하는 상태값과 셋터 함수를 생성합니다.


    // 마운트, 언마운트, 어떤 값이 변할 때이든지 호출되는 effect
    useEffect(() => {
        // fetchData는 비동기 함수입니다. 여기에서 사용된 async/await는 Promise 체인을 개선하고 가독성을 높입니다.
        const fetchData = async () => {
            const data = await fetchFoodData(curpage, ss); // 현재 페이지와 검색어를 인자로 전달하여 음식 데이터를 요청합니다.
            setFdata(data); // 응답으로 받은 데이터를 상태값에 저장합니다.
            setCurpage(data[0].curpage); // 응답으로 받은 데이터의 현재 페이지 정보를 상태값에 저장합니다.
            setTotalpage(data[0].totalpage); // 응답으로 받은 데이터의 전체 페이지 정보를 상태값에 저장합니다.
        };
        fetchData(); // 데이터를 가져오는 함수를 호출합니다.
    }, [curpage, ss]); // 페이지 번호 또는 검색어가 변경될 때 useEffect가 재실행되도록 설정합니다.
    // 데이터 검색에 변경 사항이 발생했을 때 호출되는 함수
    const handleDataChange = (e) => {
        setSs(e.target.value); // 입력 이벤트가 발생하면, e.target.value 값을 사용하여 검색어를 업데이트합니다.
    };
    // 키 이벤트 발생 시 처리하는 함수
    const handleDataKeyDown = async (e) => {
        if (e.keyCode === 13) { // 엔터 키(키 코드: 13)가 눌렸을 때
            setCurpage(1); // 현재 페이지를 1로 초기화합니다.
        }
    };
    // 검색 버튼 클릭 시 호출되는 함수
    const findData = () => {
        setCurpage(1); // 검색 버튼을 누르면 현재 페이지를 1로 초기화합니다.
    };
    // 이전 페이지 버튼 클릭 시 호출되는 함수
    const prev = () => {
        if (curpage > 1) setCurpage((prev) => prev - 1); // 현재 페이지가 1보다 크면 이전 페이지로 이동합니다.
    };
    // 다음 페이지 버튼 클릭 시 호출되는 함수
    const next = () => {
        if (curpage < totalpage) setCurpage((prev) => prev + 1); // 현재 페이지가 전체 페이지보다 작으면 다음 페이지로 이동합니다.
    };
    // food 객체를 JSX로 맵핑하고 렌더링하는 변수
    const html = fdata.map((food, index) => (
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
    ));
    // 컴포넌트 렌더링
    return (
        <div className="food_Find_wrapper row3">
            <main className="food_Find_main hoc container clear">
                <div className="content food_Find_content">
                    <div className="food_Find_search">
                        <input
                            type="text"
                            className="input-sm"
                            onChange={handleDataChange}
                            value={ss}
                            onKeyDown={handleDataKeyDown}
                        />
                        <input
                            type="button"
                            value="검색"
                            className="btn btn-sm btn-danger"
                            onClick={findData}
                        />
                    </div>
                    <ul className="nospace clear food_Find_list">{html}</ul>

                    <div className="pagination">
                        <button className="btn btn-sm btn-primary" onClick={prev}>
                            이전
                        </button>
                        {curpage} 페이지 / {totalpage} 페이지
                        <button className="btn btn-sm btn-primary" onClick={next}>
                            다음
                        </button>
                    </div>
                </div>
                <div className="clear"></div>
            </main>
        </div>
    );
}
// FoodFind 컴포넌트를 export 합니다.
export default FoodFind;