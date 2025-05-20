// import './index.css'
// import planningImg from '../../assets/planning/planning.jpg'
// import { Link, useNavigate } from 'react-router-dom'
// import { SignUp } from '../signUp'
// import { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../context'
// import axios from 'axios'
// import rightIcon from "../../assets/icon/li_arrow-right.png"
// import leftIcon from "../../assets/icon/left_arrow-right.png"
// import { toast } from 'react-toastify'

// export const PlanningTool = () => {
//     const navigate = useNavigate()
//     const context = useContext(AuthContext);
//     const token = context?.token || localStorage.getItem('token')
//     const setToken = context?.setToken;
//     const [data, setData] = useState()
//     const [checkedItems, setCheckedItems] = useState([]);
//     const userId = localStorage.getItem("_id")
//     const [startIndex, setStartIndex] = useState(0)
//     const [lastIndex, setLastIndex] = useState(2)
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
//     const [shouldSave, setShouldSave] = useState(false);
//     const [category, setCategory] = useState('Marriage')


//     const planningCategory = [{ name: 'Marriage', url: '/planning-tool' }, { name: "Birthday", url: '/planning-birthday' }, { name: "Mehndi", url: '/planning-mehndi' }, { name: "Party", url: '/planning-party' }, { name: "Room Decor", url: '/planning-other' }]



//     const handleCheck = (idx) => {
//         const isExist = checkedItems.includes(idx)
//         if (isExist) {
//             setCheckedItems(checkedItems.filter((ele) => (ele != idx)))
//         }
//         else {
//             setCheckedItems([...checkedItems, idx])
//         }
//     }

//     const handleForwardIcon = () => {
//         const totalItems = planningCategory?.length || 0;
//         const nextStart = lastIndex + 1;
//         const nextLast = lastIndex + 3;
//         if (nextStart < totalItems) {
//             setStartIndex(nextStart);
//             setLastIndex(Math.min(nextLast, totalItems - 1));
//         }
//     }

//     const handlePrev = () => {
//         setLastIndex(Math.max(2, startIndex - 1))
//         setStartIndex(Math.max(0, startIndex - 3))
//     };


//     useEffect(() => {
//         const handleResize = () => {
//             console.log(window.innerWidth, "asssssssssssssssssssssssssssss")
//             setIsMobile(window.innerWidth <= 500);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const getPlanningData = () => {
//         console.log(token, "planninglist")
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/planning_list/${userId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             params: {
//                 category: category,
//             }
//         })
//             .then((res) => {
//                 // console.log(res?.data)
//                 setData(res?.data?.planningData);
//                 setCheckedItems(res.data?.planningData?.checked)
//             }).catch((error) => {
//                 const message = error?.response?.data?.Message;
//                 if (message == 'jwt expired') {
//                     setToken("")
//                     localStorage.removeItem("_id")
//                     localStorage.removeItem("token")
//                     navigate('/')
//                 }
//             })
//     }

//     useEffect(() => {
//         getPlanningData()
//     }, [category])



//     const handleSave = () => {
//         const historyData = {
//             userId: userId,
//             planningId: data?._id,
//             checked: checkedItems || []
//         }
//         console.log(historyData, 'aaaa')
//         axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-history`, historyData, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         })
//             .then((res) => {
//                 console.log(res)
//                 toast.success('update_successfully', {
//                     position: 'top-right'
//                 })
//                 getPlanningData()
//             }).catch((error) => {
//                 console.log(error);
//             })
//     }

//     useEffect(() => {
//         if (shouldSave) {
//             handleSave();
//             setShouldSave(false);
//         }
//     }, [checkedItems]);

//     const handleClear = () => {
//         setCheckedItems([]);
//         setShouldSave(true)
//     };

//     const handleUrl = (ele) => {
//         setCategory(ele?.name);
//     }

//     return (
//         <div >

//             <div className='planning-img'>
//                 <img src={planningImg} />
//             </div>
//             <div className='plannig-category'>

//                 {isMobile ? (<>
//                     {startIndex > 0 &&
//                         <div onClick={handlePrev}><img className='planning-left-arrow' src={leftIcon} /></div>
//                     }

//                     {
//                         planningCategory?.slice(startIndex, lastIndex + 1)?.map((ele, index) => (
//                             // <div key={index}><Link to={ele.url} >{ele?.name}</Link></div>
//                             <div onClick={() => handleUrl(ele)} >{ele?.name}</div>
//                         ))
//                     }
//                     {(lastIndex < (planningCategory?.length || 0) - 1) &&
//                         <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
//                     }
//                 </>) : (<>
//                     {
//                         planningCategory?.map((ele, index) => (
//                             // <div key={index}><Link to={ele.url} >{ele?.name}</Link></div>
//                             <div onClick={() => handleUrl(ele)} >{ele?.name}</div>

//                         ))
//                     }
//                 </>
//                 )}


//             </div>
//             <div className='planning-check-list'>
//                 <div className='planning-check-header'>check List</div>
//                 {data?.description?.map((ele, idx) => (
//                     <div className='planning-list' key={idx}>
//                         <div><input type='checkbox'
//                             onChange={() => handleCheck(idx)}
//                             checked={checkedItems.includes(idx)}
//                         />
//                         </div>
//                         <div>{ele?.length > 52 ? ele.slice(0, 51) + '...' : ele}</div>
//                     </div>
//                 ))}
//                 <div className='planning-check-save' onClick={handleSave}>Save</div>
//                 <div className='planning-check-clear' onClick={handleClear} >Clear All</div>
//             </div>
//         </div>
//     )
// }
// new
import './index.css'
import planningImg from '../../assets/planning/planning.jpg'
// import { Link, useNavigate } from 'react-router-dom' // Link ab use nahi ho raha
import { useNavigate } from 'react-router-dom'
import { SignUp } from '../signUp'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context'
import axios from 'axios'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { toast } from 'react-toastify'

export const PlanningTool = () => {
    const context = useContext(AuthContext);
    const logout = context?.logout;
    const token = context?.token || localStorage.getItem('token')
    const setToken = context?.setToken;
    const [data, setData] = useState()
    const [checkedItems, setCheckedItems] = useState([]);
    const userId = localStorage.getItem("_id")
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
    const [shouldSave, setShouldSave] = useState(false);
    const [category, setCategory] = useState('Marriage')


    const planningCategory = [{ name: 'Marriage', url: '/planning-tool' }, { name: "Birthday", url: '/planning-birthday' }, { name: "Mehndi", url: '/planning-mehndi' }, { name: "Other", url: '/planning-party' }, { name: "Room Decor", url: '/planning-other' }]

    const handleCheck = (idx) => {
        const isExist = checkedItems.includes(idx)
        if (isExist) {
            setCheckedItems(checkedItems.filter((ele) => (ele !== idx))) // Strict inequality
        }
        else {
            setCheckedItems([...checkedItems, idx])
        }
    }

    const handleForwardIcon = () => {
        const totalItems = planningCategory?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3; // Yeh 3 items dikhane ka logic hai
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1));
        }
    }

    const handlePrev = () => {
        const newStartIndex = Math.max(0, startIndex - 3); // Go back by 3
        const newLastIndex = newStartIndex + 2; // Show 3 items including the new start
        setStartIndex(newStartIndex);
        setLastIndex(Math.min(newLastIndex, (planningCategory?.length || 0) - 1));
    };


    useEffect(() => {
        const handleResize = () => {
            // console.log(window.innerWidth, "asssssssssssssssssssssssssssss")
            setIsMobile(window.innerWidth <= 500);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getPlanningData = () => {
        if (!userId || !token) {
            console.warn("User ID or Token missing, cannot fetch planning data.");
            // Optional: redirect to login or show message
            // navigate('/'); 
            return;
        }
        // console.log(token, "planninglist")
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/planning_list/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                category: category,
            }
        })
            .then((res) => {
                setData(res?.data?.planningData);
                // Server se `checked` array aana chahiye jo numbers ka array ho (indices)
                // Agar server se string array aa raha hai to use parse karna padega
                setCheckedItems(res.data?.planningData?.checked || []);
            }).catch((error) => {
                const message = error?.response?.data?.Message;
                if (message === 'jwt expired') {
                    logout()
                }
            })
    }

    useEffect(() => {
        getPlanningData()
    }, [category, token, userId]) // Add token and userId as dependencies if they can change


    const handleSave = () => {
        if (!data?._id) {
            toast.error("No planning data loaded to save.");
            return;
        }
        const historyData = {
            userId: userId,
            planningId: data?._id,
            checked: checkedItems || []
        }
        // console.log(historyData, 'aaaa')
        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-history`, historyData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                // console.log(res)
                toast.success('Checklist saved successfully!', { // Changed message
                    position: 'top-right'
                })
                // No need to call getPlanningData() again unless server state changes significantly
                // setShouldSave(false); // Reset if you were using it for manual save trigger
            }).catch((error) => {
                console.error("Error saving planning history:", error);
                toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
            })
    }

    // Auto-save logic (optional, if you want save on every check/uncheck)
    useEffect(() => {
        if (shouldSave) { // This flag is set to true by handleClear
            handleSave();
            setShouldSave(false);
        }
    }, [shouldSave, checkedItems]); // Rerun if shouldSave or checkedItems change

    const handleClear = () => {
        setCheckedItems([]);
        setShouldSave(true); // Trigger save after clearing
    };

    const handleUrl = (ele) => {
        setCategory(ele?.name);
        // No need for navigate(ele.url) if you are handling category change within this component
    }

    return (
        <div >
            <div className='planning-img'>
                <img src={planningImg} alt="Planning" /> {/* Added alt text */}
            </div>
            <div className='plannig-category'>
                {isMobile ? (<>
                    {startIndex > 0 &&
                        <div onClick={handlePrev} className='planning-arrow'><img className='planning-left-arrow' src={leftIcon} alt="Previous" /></div>
                    }
                    {
                        planningCategory?.slice(startIndex, lastIndex + 1)?.map((ele) => (
                            <div
                                key={ele.name} // Use a unique key like ele.name
                                onClick={() => handleUrl(ele)}
                                // Conditionally add 'active-category' class
                                className={`category-item ${category === ele.name ? 'active-category' : ''}`}
                            >
                                {ele?.name}
                            </div>
                        ))
                    }
                    {(lastIndex < (planningCategory?.length || 0) - 1) &&
                        <div onClick={handleForwardIcon} className='planning-arrow'><img src={rightIcon} alt="Next" /></div>
                    }
                </>) : (<>
                    {
                        planningCategory?.map((ele) => (
                            <div
                                key={ele.name} // Use a unique key
                                onClick={() => handleUrl(ele)}
                                // Conditionally add 'active-category' class
                                className={`category-item ${category === ele.name ? 'active-category' : ''}`}
                            >
                                {ele?.name}
                            </div>
                        ))
                    }
                </>
                )}
            </div>
            <div className='planning-check-list'>
                <div className='planning-check-header'>Check List for {category}</div>
                {data?.description?.map((item, idx) => (
                    <div className='planning-list' key={idx}>
                        <div>
                            <input
                                type='checkbox'
                                id={`checkbox-${idx}`}
                                onChange={() => handleCheck(idx)}
                                checked={checkedItems.includes(idx)}
                            />
                        </div>
                        <div>
                            <label htmlFor={`checkbox-${idx}`}>
                                {item?.length > 52 ? item?.slice(0, 51) + '...' : item}
                            </label>
                        </div>
                    </div>
                ))}
                {data?.description && data?.description?.length > 0 && (
                    < >
                        <div className='planning-check-save' onClick={handleSave}>Save</div>
                        <div className='planning-check-clear' onClick={handleClear} >Clear All</div>
                    </>
                )}
                {(!data?.description || data.description.length === 0) && (
                    <div className='no-items-message'>No items available for {category}.</div>
                )}
            </div>
        </div>
    )
}