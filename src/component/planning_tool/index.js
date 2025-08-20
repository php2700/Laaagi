
// import './index.css'
// import planningImg from '../../assets/planning/planning.jpg'
// import { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../context'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { Navigate, useParams } from 'react-router-dom'
// import downArrow from "../../assets/logo/down.png";
// import { HeaderPlanning } from './heaader_planning'


// export const PlanningTool = () => {
//     const context = useContext(AuthContext);
//     const logout = context?.logout;
//     const token = context?.token || localStorage.getItem('token')
//     const setToken = context?.setToken;
//     const [data, setData] = useState()
//     const [checkedItems, setCheckedItems] = useState([]);
//     const userId = localStorage.getItem("_id")
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
//     const [shouldSave, setShouldSave] = useState(false);
//     const [category, setCategory] = useState('')
//     const [clearToaster, setClearToaster] = useState(false)
//     const [eventData, setEventData] = useState({})
//     const [checkEvent, setCheckEvent] = useState([])
//     const [planningId, setPlanningId] = useState();
//     const [eventLoading, setEventLoading] = useState(false)


//     const handleCheck = (data, idx, events) => {
//         const isExist = checkedItems.includes(idx)
//         if (isExist) {
//             setCheckedItems(checkedItems.filter((ele) => (ele !== idx)))
//         }
//         else {
//             setCheckedItems([...checkedItems, idx])
//         }
//     }


//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 500);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const getPlanningData = () => {
//         if (!userId || !token) {
//             console.warn("User ID or Token missing, cannot fetch planning data.");
//             // Optional: redirect to login or show message
//             // navigate('/'); 
//             return;
//         }
//         // console.log(token, "planninglist")
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/planning_list`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         })
//             .then((res) => {
//                 setData(res?.data?.planningData);
//             }).catch((error) => {
//                 const message = error?.response?.data?.Message;
//                 if (message === 'jwt expired') {
//                     logout()
//                 }
//             })
//     }

//     const getcheckedEventData = () => {
//         if (!userId || !token) {
//             console.warn("User ID or Token missing, cannot fetch planning data.");
//             // navigate('/'); 
//             return;
//         }
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/event-list/${userId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             params: {
//                 category: category,
//             }
//         })
//             .then((res) => {
//                 setEventData(res?.data?.userCheckedEvent)
//                 setCheckedItems(res.data?.userCheckedEvent[0]?.checked || []);
//             })
//             .catch((error) => {
//                 const message = error?.response?.data?.Message;
//                 if (message === 'jwt expired') {
//                     logout()
//                 }
//             })
//             .finally(() => {
//                 setEventLoading(false)
//             })
//     }

//     useEffect(() => {
//         getcheckedEventData()
//     }, [category])

//     useEffect(() => {
//         if (token)
//             getPlanningData()
//     }, [token, userId])


//     // const handleSave = () => {
//     //     const sendEventData = {
//     //         userId: userId,
//     //         planningId: planningId,
//     //         checked: checkedItems || []
//     //     }
//     //     axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-history`, sendEventData, {
//     //         headers: {
//     //             Authorization: `Bearer ${token}`
//     //         },
//     //     })
//     //         .then((res) => {
//     //             if (clearToaster) {
//     //                 toast.success('Data Clear Successfully!', {
//     //                     position: 'top-right'
//     //                 })
//     //                 setClearToaster(false)
//     //             } else
//     //                 toast.success('Checklist Saved Successfully!', {
//     //                     position: 'top-right'
//     //                 })
//     //         }).catch((error) => {
//     //             console.error("Error saving planning history:", error);
//     //             toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
//     //         })
//     // }
//     const handleSave = () => {
//     if (!checkedItems || checkedItems.length === 0) {
//         toast.error('Failed to save checklist. Please select at least one item.', {
//             position: 'top-right'
//         });
//         return;
//     }

//     const sendEventData = {
//         userId: userId,
//         planningId: planningId,
//         checked: checkedItems
//     };

//     axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-history`, sendEventData, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//     })
//     .then((res) => {
//         if (clearToaster) {
//             toast.success('Data Clear Successfully!', {
//                 position: 'top-right'
//             });
//             setClearToaster(false);
//         } else {
//             toast.success('Checklist Saved Successfully!', {
//                 position: 'top-right'
//             });
//         }
//     }).catch((error) => {
//         console.error("Error saving planning history:", error);
//         toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
//     });
// };


//     useEffect(() => {
//         if (shouldSave) {
//             handleSave();
//             setShouldSave(false);
//         }
//     }, [shouldSave, checkedItems]);

//     const handleClear = () => {
//         setClearToaster(true)
//         setCheckedItems([]);
//         setShouldSave(true);
//     };

//     const handleEvent = (eventData) => {
//         setCheckEvent([])
//         setCheckedItems([])
//         setPlanningId(eventData?._id)
//         setCategory(eventData.category)
//     }

//     const handleHelp = (data) => {
//         const sendEventData = {
//             userId: userId,
//             planningId: data?._id,
//         }
//         axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-help`, sendEventData, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         })
//             .then((res) => {
//                 if (res?.data)
//                     toast.success('Request sent successfully!', {
//                         position: 'top-right'
//                     })
//             }).catch((error) => {
//                 console.error("Error saving planning history:", error);
//                 toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
//             })
//     }

//     return (
//         <>
//             {
//                 token ? < div >
//                     <div className='planning-img'>
//                         <img src={planningImg} alt="Planning" />
//                     </div>

//                     <div className='planning-check-list'>
//                         <HeaderPlanning />
//                         {/* <div className='planning-check-header'>Planning List</div> */}
//                         <ol>
//                         {data?.map((item, idx) => (
//                             <li>
//                             <div className='planning-list' key={idx}>
//                                 <div>
//                                     <label className='font-size-text' htmlFor={`checkbox-${idx}`} onClick={() => { handleEvent(item) }}>
//                                         {item?.category}
//                                         <img
//                                             src={downArrow}
//                                             alt="Open user menu"
//                                         />
//                                     </label>

//                                     <label className='font-size-help' onClick={() => { handleHelp(item) }} > (Need Help)?

//                                     </label>
//                                 </div>
//                                 {(category == item.category) &&
//                                     <div>{eventData[0]?.description?.length > 0 ?
//                                         <>
//                                             {eventData[0]?.description?.map((item1, index) => (

//                                                 <div className='planning-category-list'>
//                                                     <input
//                                                         type='checkbox'
//                                                         // id={`checkbox-${idx}`}
//                                                         onChange={() => handleCheck(item1, index, item?.category)}
//                                                         checked={checkedItems.includes(index)}
//                                                     />
//                                                     <span >{item1}.</span>
//                                                 </div>
//                                             ))}
//                                         </>
//                                         :
//                                         <div className='no-items-message'>No items available for {category}.</div>
//                                     }
//                                     </div>
//                                 }
//                             </div></li>
//                         ))}
//                         </ol>
//                         < >
//                             <div className='planning-check-save' onClick={handleSave}>Add Planning</div>
//                             <div className='planning-check-clear' onClick={handleClear} >Clear All</div>
//                         </>
//                     </div>
//                 </div > :
//                     <Navigate to='/signup' />
//             }
//         </>
//     )
// }
// import './index.css'
// import planningImg from '../../assets/planning/planning.jpg'
// import { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../context'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { Navigate } from 'react-router-dom'
// import downArrow from "../../assets/logo/down.png";
// import { HeaderPlanning } from './heaader_planning'

// export const PlanningTool = () => {
//     const context = useContext(AuthContext);
//     const logout = context?.logout;
//     const token = context?.token || localStorage.getItem('token')
//     const setToken = context?.setToken;
//     const [data, setData] = useState()
//     const [checkedItems, setCheckedItems] = useState([]);
//     const userId = localStorage.getItem("_id")
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
//     const [shouldSave, setShouldSave] = useState(false);
//     const [category, setCategory] = useState('')
//     const [clearToaster, setClearToaster] = useState(false)
//     const [eventData, setEventData] = useState({})
//     const [checkEvent, setCheckEvent] = useState([])
//     const [planningId, setPlanningId] = useState();
//     const [eventLoading, setEventLoading] = useState(false)

//     const handleCheck = (data, idx, events) => {
//         const isExist = checkedItems.includes(idx)
//         if (isExist) {
//             setCheckedItems(checkedItems.filter((ele) => (ele !== idx)))
//         }
//         else {
//             setCheckedItems([...checkedItems, idx])
//         }
//     }

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 500);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const getPlanningData = () => {
//         if (!userId || !token) {
//             console.warn("User ID or Token missing, cannot fetch planning data.");
//             return;
//         }
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/planning_list`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         })
//             .then((res) => {
//                 setData(res?.data?.planningData);
//             }).catch((error) => {
//                 const message = error?.response?.data?.Message;
//                 if (message === 'jwt expired') {
//                     logout()
//                 }
//             })
//     }

//     const getcheckedEventData = () => {
//         if (!userId || !token) {
//             console.warn("User ID or Token missing, cannot fetch planning data.");
//             return;
//         }
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/event-list/${userId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             params: {
//                 category: category,
//             }
//         })
//             .then((res) => {
//                 setEventData(res?.data?.userCheckedEvent)
//                 setCheckedItems(res.data?.userCheckedEvent[0]?.checked || []);
//             })
//             .catch((error) => {
//                 const message = error?.response?.data?.Message;
//                 if (message === 'jwt expired') {
//                     logout()
//                 }
//             })
//             .finally(() => {
//                 setEventLoading(false)
//             })
//     }

//     useEffect(() => {
//         getcheckedEventData()
//     }, [category])

//     useEffect(() => {
//         if (token)
//             getPlanningData()
//     }, [token, userId])

//     const handleSave = () => {
//         if (!checkedItems || checkedItems.length === 0) {
//             toast.error('Failed to save checklist. Please select at least one item.', {
//                 position: 'top-right'
//             });
//             return;
//         }

//         const sendEventData = {
//             userId: userId,
//             planningId: planningId,
//             checked: checkedItems
//         };

//         axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-history`, sendEventData, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         })
//             .then((res) => {
//                 if (clearToaster) {
//                     toast.success('Data Clear Successfully!', {
//                         position: 'top-right'
//                     });
//                     setClearToaster(false);
//                 } else {
//                     toast.success('Checklist Saved Successfully!', {
//                         position: 'top-right'
//                     });
//                 }
//             }).catch((error) => {
//                 console.error("Error saving planning history:", error);
//                 toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
//             });
//     };

//     useEffect(() => {
//         if (shouldSave) {
//             handleSave();
//             setShouldSave(false);
//         }
//     }, [shouldSave, checkedItems]);

//     const handleClear = () => {
//         setClearToaster(true)
//         setCheckedItems([]);
//         setShouldSave(true);
//     };

//     const handleEvent = (eventData) => {
//         if (category === eventData.category) {
//             // close if clicked again
//             setCategory('');
//             return;
//         }
//         setCheckEvent([])
//         setCheckedItems([])
//         setPlanningId(eventData?._id)
//         setCategory(eventData.category)
//     }

//     const handleHelp = (data) => {
//         const sendEventData = {
//             userId: userId,
//             planningId: data?._id,
//         }
//         axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-help`, sendEventData, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         })
//             .then((res) => {
//                 if (res?.data)
//                     toast.success('Request sent successfully!', {
//                         position: 'top-right'
//                     })
//             }).catch((error) => {
//                 console.error("Error saving planning history:", error);
//                 toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
//             })
//     }

//     return (
//         <>
//             {
//                 token ? <div>
//                     <div className='planning-img'>
//                         <img src={planningImg} alt="Planning" />
//                     </div>

//                     <div className='planning-check-list'>
//                         <HeaderPlanning />
//                         <ol>
//                             {data?.map((item, idx) => (
//                                 <li key={idx}>
//                                     <div className='planning-list'>
//                                         <div
//                                             className="accordion-header"
//                                             onClick={() => handleEvent(item)}
//                                             style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
//                                         >
//                                             <span className="font-size-text">{item?.category}</span>
//                                             <img
//                                                 src={downArrow}
//                                                 alt="toggle"
//                                                 className={`accordion-icon ${category === item.category ? "rotate" : ""}`}
//                                             />
//                                         </div>

//                                         <label
//                                             className='font-size-help'
//                                             onClick={() => { handleHelp(item) }}
//                                         >
//                                             (Need Help)?
//                                         </label>

//                                         {category === item.category && (
//                                             <div className="accordion-content">
//                                                 {eventData[0]?.description?.length > 0 ? (
//                                                     <>
//                                                         {eventData[0]?.description?.map((item1, index) => (
//                                                             <div key={index} className='planning-category-list'>
//                                                                 <input
//                                                                     type='checkbox'
//                                                                     onChange={() => handleCheck(item1, index, item?.category)}
//                                                                     checked={checkedItems.includes(index)}
//                                                                 />
//                                                                 <span>{item1}.</span>
//                                                             </div>
//                                                         ))}
//                                                     </>
//                                                 ) : (
//                                                     <div className='no-items-message'>No items available for {category}.</div>
//                                                 )}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </li>
//                             ))}
//                         </ol>
//                         <>
//                             <div className='planning-check-save' onClick={handleSave}>Add Planning</div>
//                             <div className='planning-check-clear' onClick={handleClear}>Clear All</div>
//                         </>
//                     </div>
//                 </div> :
//                     <Navigate to='/signup' />
//             }
//         </>
//     )
// }
import './index.css'
import planningImg from '../../assets/planning/planning.jpg'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import downArrow from "../../assets/logo/down.png";
import { HeaderPlanning } from './heaader_planning'

export const PlanningTool = () => {
    const context = useContext(AuthContext);
    const logout = context?.logout;
    const token = context?.token || localStorage.getItem('token')
    const setToken = context?.setToken;
    const [data, setData] = useState([]) // Initialize with empty array
    const [checkedItems, setCheckedItems] = useState([]);
    const userId = localStorage.getItem("_id")
    const [shouldSave, setShouldSave] = useState(false);
    const [category, setCategory] = useState('')
    const [clearToaster, setClearToaster] = useState(false)
    const [eventData, setEventData] = useState({})
    const [planningId, setPlanningId] = useState();
    const [eventLoading, setEventLoading] = useState(false)

    const handleCheck = (data, idx, events) => {
        const isExist = checkedItems.includes(idx)
        if (isExist) {
            setCheckedItems(checkedItems.filter((ele) => (ele !== idx)))
        }
        else {
            setCheckedItems([...checkedItems, idx])
        }
    }

    const getPlanningData = () => {
        if (!userId || !token) {
            console.warn("User ID or Token missing, cannot fetch planning data.");
            return;
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/planning_list`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                setData(res?.data?.planningData || []); // Ensure data is an array
            }).catch((error) => {
                const message = error?.response?.data?.Message;
                if (message === 'jwt expired') {
                    logout()
                }
            })
    }

    const getcheckedEventData = () => {
        if (!userId || !token || !category) {
            return;
        }
        setEventLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/event-list/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                category: category,
            }
        })
            .then((res) => {
                setEventData(res?.data?.userCheckedEvent)
                setCheckedItems(res.data?.userCheckedEvent[0]?.checked || []);
            })
            .catch((error) => {
                const message = error?.response?.data?.Message;
                if (message === 'jwt expired') {
                    logout()
                }
            })
            .finally(() => {
                setEventLoading(false)
            })
    }

    useEffect(() => {
        getcheckedEventData()
    }, [category])

    useEffect(() => {
        if (token)
            getPlanningData()
    }, [token, userId])

    const handleSave = () => {
        if (!checkedItems || checkedItems.length === 0) {
            toast.error('Failed to save checklist. Please select at least one item.', {
                position: 'top-right'
            });
            return;
        }

        const sendEventData = {
            userId: userId,
            planningId: planningId,
            checked: checkedItems
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-history`, sendEventData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                if (clearToaster) {
                    toast.success('Data Clear Successfully!', {
                        position: 'top-right'
                    });
                    setClearToaster(false);
                } else {
                    toast.success('Checklist Saved Successfully!', {
                        position: 'top-right'
                    });
                }
            }).catch((error) => {
                console.error("Error saving planning history:", error);
                toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
            });
    };

    useEffect(() => {
        if (shouldSave) {
            handleSave();
            setShouldSave(false);
        }
    }, [shouldSave, checkedItems]);

    const handleClear = () => {
        setClearToaster(true)
        setCheckedItems([]);
        setShouldSave(true);
    };

    const handleEvent = (eventData) => {
        if (category === eventData.category) {
            setCategory('');
            return;
        }
        setCheckedItems([])
        setPlanningId(eventData?._id)
        setCategory(eventData.category)
    }

    const handleHelp = (e, data) => {
        e.stopPropagation(); // Prevents accordion from toggling
        const sendEventData = {
            userId: userId,
            planningId: data?._id,
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-planning-help`, sendEventData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                if (res?.data)
                    toast.success('Request sent successfully!', {
                        position: 'top-right'
                    })
            }).catch((error) => {
                console.error("Error saving planning history:", error);
                toast.error(error?.response?.data?.Message || 'Failed to save checklist.');
            })
    }

    return (
        <>
            {token ? (
                <div className="planning-page">
                    <div className='planning-img'>
                        <img src={planningImg} alt="Planning" />
                    </div>

                    <div className='planning-container'>
                        <HeaderPlanning />
                        <ul className="planning-list">
                            {data?.map((item, idx) => (
                                <li key={idx} className="planning-list-item">
                                    <div
                                        className="accordion-header"
                                        onClick={() => handleEvent(item)}
                                    >
                                        <div className="accordion-title">
                                           <span>{`${idx + 1}. ${item?.category}`}</span>
                                            <small
                                                className='help-text'
                                                onClick={(e) => handleHelp(e, item)}
                                            >
                                                (Need Help)?
                                            </small>
                                        </div>
                                        <img
                                            src={downArrow}
                                            alt="toggle"
                                            className={`accordion-icon ${category === item.category ? "rotate" : ""}`}
                                        />
                                    </div>

                                    {category === item.category && (
                                        <div className="accordion-content">
                                            {eventLoading ? (
                                                <div>Loading...</div>
                                            ) : eventData && eventData[0]?.description?.length > 0 ? (
                                                eventData[0]?.description?.map((item1, index) => (
                                                    <label key={index} className='checkbox-container'>
                                                        <input
                                                            type='checkbox'
                                                            onChange={() => handleCheck(item1, index, item?.category)}
                                                            checked={checkedItems.includes(index)}
                                                        />
                                                        <span className="checkmark"></span>
                                                        <span>{item1}</span>
                                                    </label>
                                                ))
                                            ) : (
                                                <div className='no-items-message'>No items available for {category}.</div>
                                            )}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className='button-group'>
                            <button className='btn btn-primary' onClick={handleSave}>Add Planning</button>
                            <button className='btn btn-secondary' onClick={handleClear}>Clear All</button>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to='/signup' />
            )}
        </>
    )
}