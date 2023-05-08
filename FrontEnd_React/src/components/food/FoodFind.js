import {useEffect,useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function FoodFind(){
    const [ss,setSs]=useState('제주')
    const [fdata,setFdata]=useState([]);
    const [curpage,setCurpage]=useState(1)
    const [totalpage,setTotalpage]=useState(0)
    useEffect(()=>{
        axios.get("http://localhost/jeju/food_find_react",{
            params:{
                page:curpage,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)
            setCurpage(response.data[0].curpage)
            setTotalpage(response.data[0].totalpage)
        })
    },[])
    const dataChange=(e)=>{
        setSs(e.target.value)

    }
    const dataKeyDown=(e)=>{
        setCurpage(1)
        if(e.keyCode==13)
        {
            axios.get("http://localhost/jeju/food_find_react",{
                params:{
                    page:curpage,
                    title:ss
                }
            }).then(response=>{
                console.log(response.data)
                setFdata(response.data)
                setCurpage(response.data[0].curpage)
                setTotalpage(response.data[0].totalpage)
            })
        }
    }
    const findData=()=>{
       //alert(ss)
        setCurpage(1)
        axios.get("http://localhost/jeju/food_find_react",{
            params:{
                page:curpage,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)
            setCurpage(response.data[0].curpage)
            setTotalpage(response.data[0].totalpage)
        })
    }
    const prev=()=>{
        const page=curpage>1?curpage-1:curpage;

        axios.get("http://localhost/jeju/food_find_react",{
            params:{
                page:page,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)

        })
        setCurpage(page)
    }
    const next=()=>{
        const page=curpage<totalpage?curpage+1:curpage

        axios.get("http://localhost/jeju/food_find_react",{
            params:{
                page:page,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)

        })
        setCurpage(page)
    }
    let html=fdata.map((food,index)=>
        <li className={index%4==0?'one_quarter first':'one_quarter'}>
            <NavLink to={"/jeju/food_detail/"+food.no}>
                <img src={food.poster} title={food.title}/>
            </NavLink>
        </li>
    )
    return (
        <div className="wrapper row3">
            <main className="hoc container clear">

                <div className="content">

                    <div id="gallery">
                        <figure>
                            <header className="heading inline">
                                <input type={"text"} size={"30"} className={"input-sm"}
                                       onChange={dataChange} value={ss} onKeyDown={dataKeyDown}/>
                                <input type={"button"} value={"검색"}
                                       className={"btn btn-sm btn-danger"} onClick={findData}/>
                            </header>
                            <ul className="nospace clear">
                                {html}
                            </ul>

                        </figure>
                    </div>


                </div>
                <div className={"text-center"}>
                    <button className={"btn btn-sm btn-primary"} onClick={prev}>이전</button>
                    {curpage} page / {totalpage} pages
                    <button className={"btn btn-sm btn-primary"} onClick={next}>다음</button>
                </div>

                <div className="clear"></div>
            </main>
        </div>
    )
}
export default FoodFind