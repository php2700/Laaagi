import './index.css'
import { planningCategory } from "../category"
import planningImg from '../../assets/planning/planning.jpg'
import { Link } from 'react-router-dom'
import { SignUp } from '../signUp'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context'
import axios from 'axios'

export const PlanningTool = () => {
    const { token } = useContext(AuthContext)
    const [data, setData] = useState()
    const [checkedItems, setCheckedItems] = useState([]);
    const userId = localStorage.getItem("_id")

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

    const handleSave = (checkedItems) => {
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
                getPlanningData()
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleClear = () => {
        const clear = [];
        setCheckedItems(clear)
        handleSave()
    }

    return (
        <div >
            <div>
                <img src={planningImg} />
            </div>
            <div className='plannig-category'>
                {
                    planningCategory?.map((ele, index) => (
                        <div key={index}><Link to={ele.url} >{ele?.name}</Link></div>
                    ))
                }
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