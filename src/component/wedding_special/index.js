import './index.css'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const WeddingSpecial = () => {
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [data, setData] = useState([]);
    const context = useContext(AuthContext);
    const sweetsInfo = context?.setSweetsInfo;
    const navigate = useNavigate();

    // const weddingSpecialList = () => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}api/user/wedding_list`).then((res) => {
    //         setData(res?.data?.weddingData)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }


    const weddingSpecialList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
            params: {
                isWedding: true
            }
        })
            .then((res) => {
                setData(res?.data?.sweetsData);
                console.log(res?.data?.sweetsData)
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        weddingSpecialList()
    }, [])

    const handleForwardIcon = () => {
        const totalItems = data?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3;
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1));
        }
    }

    const handlePrev = () => {
        const prevStart = Math.max(0, startIndex - 3);
        const prevLast = Math.max(2, lastIndex - 3);
        setStartIndex(prevStart);
        setLastIndex(prevLast);
    };

    const handleWeddingInfo = (data) => {
        sweetsInfo(data)
        navigate('/sweets-info')
    }


    return (
        <div className="wedding" >
            <div className='wedding-top' >
                <div className='wedding-left-text'>Wedding special</div>
                {/* <div className='wedding-right-text'>See More</div> */}
                
               <Link to="/sweets" state={{ filter: 'wedding' }} className="wedding-right-text">See More</Link>

                {/* <div className='wedding-right-text'>See More</div> */}
            </div>
            <div className='wedding-img-list' >
                {startIndex > 0 && (
                    <div onClick={handlePrev} className='wedding-img-left-icon'>
                        <img src={leftIcon} alt="prev" />
                    </div>
                )}
                {data?.slice(startIndex, lastIndex + 1).map((item) => (
                    <div key={item?.id} className='wedding-img-wrapper'>
                        <div className='wedding-img-container'>
                            <img className='wedding-img' onClick={() => handleWeddingInfo(item)} src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="Wedding" />
                        </div>
                        <div className='wedding-img-text'>{item?.name}</div>
                    </div>
                ))}
                {(lastIndex < (data?.length || 0) - 1) && (
                    <div onClick={() => { handleForwardIcon() }} className='wedding-img-right-icon'>
                        <img src={rightIcon} />
                    </div>
                )}
            </div>
        </div>

    )
}
// new
// import './index.css'
// import rightIcon from "../../assets/icon/li_arrow-right.png"
// import leftIcon from "../../assets/icon/left_arrow-right.png"
// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context';
// import { useNavigate }  from 'react-router-dom'; // useNavigate ko import karein agar Link ke alawa use karna ho
// import { Link } from 'react-router-dom'; // Link already imported hai

// export const WeddingSpecial = () => {
//     const [startIndex, setStartIndex] = useState(0)
//     const [lastIndex, setLastIndex] = useState(2) // Display 3 items at a time
//     const [data, setData] = useState([]);
//     const context = useContext(AuthContext);
//     const sweetsInfo = context?.setSweetsInfo; // Yeh single sweet ki info ke liye hai
//     const navigate = useNavigate(); // useNavigate hook

//     const weddingSpecialList = () => {
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
//             params: {
//                 isWedding: true // Yeh section hamesha wedding sweets hi fetch karega
//             }
//         })
//         .then((res) => {
//             setData(res?.data?.sweetsData || []); // Default to empty array if undefined
//             console.log("Wedding special data for carousel:", res?.data?.sweetsData)
//         }).catch((error) => {
//             console.log(error);
//         })
//     }

//     useEffect(() => {
//         weddingSpecialList()
//     }, [])

//     const handleForwardIcon = () => {
//         const totalItems = data?.length || 0;
//         const nextStart = lastIndex + 1;
//         const nextLast = lastIndex + 3; // Assuming you want to show 3 items
//         if (nextStart < totalItems) {
//             setStartIndex(nextStart);
//             setLastIndex(Math.min(nextLast, totalItems - 1));
//         }
//     }

//     const handlePrev = () => {
//         const prevStart = Math.max(0, startIndex - 3); // Assuming you want to show 3 items
//         // Ensure lastIndex is at least 2 (for 3 items) or totalItems - 1 if less than 3 items total
//         const prevLast = Math.max(2, lastIndex - 3);
//         setStartIndex(prevStart);
//         setLastIndex(prevLast);
//     };

//     // Yeh function individual sweet item pe click karne pe /sweets-info pe le jaata hai
//     const handleSweetItemClick = (itemData) => {
//         if (sweetsInfo) { // Check if sweetsInfo function exists
//             sweetsInfo(itemData);
//         }
//         navigate('/sweets-info');
//     }

//     return (
//         <div className="wedding" >
//             <div className='wedding-top' >
//                 <div className='wedding-left-text'>Wedding special</div>
//                 {/* 
//                   "See More" pe click karne par /sweets route pe jaayenge
//                   aur state mein { filter: 'wedding' } pass karenge
//                 */}
//                 <Link to="/sweets" state={{ filter: 'wedding' }} className="wedding-right-text">
//                     See More
//                 </Link>
//             </div>
//             <div className='wedding-img-list' >
//                 {startIndex > 0 && (
//                     <div onClick={handlePrev} className='wedding-img-left-icon'>
//                         <img src={leftIcon} alt="prev" />
//                     </div>
//                 )}
//                 {/* Ensure data exists and is an array before slicing */}
//                 {Array.isArray(data) && data.slice(startIndex, lastIndex + 1).map((item) => (
//                     <div key={item?.id} className='wedding-img-wrapper'>
//                         <div className='wedding-img-container'>
//                             {/* Use handleSweetItemClick for individual item navigation */}
//                             <img 
//                                 className='wedding-img' 
//                                 onClick={() => handleSweetItemClick(item)} 
//                                 src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} 
//                                 alt="Wedding" 
//                             />
//                         </div>
//                         <div className='wedding-img-text'>{item?.name}</div>
//                     </div>
//                 ))}
//                 {(Array.isArray(data) && lastIndex < (data.length - 1)) && (
//                     <div onClick={handleForwardIcon} className='wedding-img-right-icon'>
//                         <img src={rightIcon} alt="next"/> {/* Added alt text */}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }