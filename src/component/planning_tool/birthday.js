
import './index.css'
import { planningCategory } from "../category"
import planningImg from '../../assets/planning/planning.jpg'
import { Link } from 'react-router-dom'
import { SignUp } from '../signUp'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context'
import axios from 'axios'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { toast } from 'react-toastify'


export const PlanningBirthDay = () => {
    const { token } = useContext(AuthContext)
    const [data, setData] = useState()
    const [checkedItems, setCheckedItems] = useState([]);
    const userId = localStorage.getItem("_id")
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [shouldSave, setShouldSave] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)

    const handleForwardIcon = () => {
        const totalItems = planningCategory?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3;
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1));
        }
    }

    const handlePrev = () => {
        setLastIndex(Math.max(2, startIndex - 1))
        setStartIndex(Math.max(0, startIndex - 3))
    };


    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth, "asssssssssssssssssssssssssssss")
            setIsMobile(window.innerWidth <= 500);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getPlanningData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/planning_list/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                category: planningCategory[1]?.name,
            }
        })
            .then((res) => {
                console.log(res?.data)
                setData(res?.data?.planningData);
                setCheckedItems(res.data?.planningData?.checked)
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getPlanningData()
    }, [])

    const handleCheck = (idx) => {
        const isExist = checkedItems.includes(idx)
        if (isExist) {
            setCheckedItems(checkedItems.filter((ele) => (ele != idx)))
        }
        else {
            setCheckedItems([...checkedItems, idx])
        }
    }

    const handleSave = () => {
        const historyData = {
            userId: userId,
            planningId: data?._id,
            checked: checkedItems
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-history`, historyData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                console.log(res)
                toast.success('update_successfully', {
                    position: 'top-right'
                })
                getPlanningData()
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (shouldSave) {
            handleSave();
            setShouldSave(false); 
        }
    }, [checkedItems]);
    
    const handleClear = () => {
        setCheckedItems([]);
        setShouldSave(true)
    };


    return (
        <div >
            <div className='planning-img'>
                <img src={planningImg} />
            </div>
            <div className='plannig-category'>
                {isMobile ? (<>
                    {startIndex > 0 &&
                        <div onClick={handlePrev}><img className='planning-left-arrow' src={leftIcon} /></div>
                    }

                    {
                        planningCategory?.slice(startIndex, lastIndex + 1)?.map((ele, index) => (
                            <div key={index}><Link to={ele.url} >{ele?.name}</Link></div>
                        ))
                    }
                    {(lastIndex < (planningCategory?.length || 0) - 1) &&
                        <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                    }
                </>) : (<>
                    {
                        planningCategory?.map((ele, index) => (
                            <div key={index}><Link to={ele.url} >{ele?.name}</Link></div>
                        ))
                    }
                </>
                )}


            </div>
            <div className='planning-check-list'>
                <div className='planning-check-header'>check List</div>
                {data?.description?.map((ele, idx) => (
                    <div className='planning-list' key={idx}>
                        <div><input type='checkbox'
                            onChange={() => handleCheck(idx)}
                            checked={checkedItems.includes(idx)}
                        />
                        </div>
                        <div>{ele?.length > 52 ? ele.slice(0, 51) + '...' : ele}</div>
                    </div>
                ))}
                <div className='planning-check-save' onClick={handleSave}>Save</div>
                <div className='planning-check-clear' onClick={handleClear} >Clear All</div>
            </div>
        </div>
    )
}