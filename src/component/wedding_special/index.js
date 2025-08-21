import './index.css'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';


// export const WeddingSpecial = () => {

//     const [startIndex, setStartIndex] = useState(0)
//     const [lastIndex, setLastIndex] = useState(2)
//     const [data, setData] = useState([]);
//     const context = useContext(AuthContext);
//     const sweetsInfo = context?.setSweetsInfo;
//     const navigate = useNavigate();


//     const weddingSpecialList = () => {
       
        
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
//             params: {
//                 isWedding: true
//             }
//         })
//             .then((res) => {
//                 setData(res?.data?.sweetsData);
//                 console.log(res?.data?.sweetsData)
//             }).catch((error) => {
//                 console.log(error);
//             })
//     }


//     useEffect(() => {
//         weddingSpecialList()
//     }, [])

//     const handleForwardIcon = () => {
//         let totalItems = data?.length || 0;
//         const nextStart = lastIndex + 1;
//         const nextLast = lastIndex + 3;
//         console.log(nextStart, "nextStart", nextLast, "nextLast")
//         if (nextStart < totalItems) {
//             setStartIndex(nextStart);
//             setLastIndex(Math.min(nextLast, totalItems - 1));
//         }
//     }

//     const handlePrev = () => {
//         const prevStart = Math.max(0, startIndex - 3);
//         const prevLast = Math.max(2, startIndex - 1);

//         setStartIndex(prevStart);
//         setLastIndex(prevLast);
//     };

//     const handleWeddingInfo = (data) => {
//         sweetsInfo(data)
//         // navigate('/sweets-info')
//         const url = 'home';
//         navigate(`/sweets-info/${data?._id}/${url}`);
//     }
   


//     return (
        
        
//         <div className="wedding" >
//             <div className='wedding-top' >
//                 <div className='wedding-left-text'>Wedding special</div>
//                 <Link to="/sweets" state={{ filter: 'wedding' }} className="wedding-right-text">See More</Link>
//             </div>
//             <div className='wedding-img-list' >
//                 {startIndex > 0 && (
//                     <div onClick={handlePrev} className='wedding-img-left-icon'>
//                         <img src={leftIcon} alt="prev" />
//                     </div>
//                 )}
//                 {data?.slice(startIndex, lastIndex + 1).map((item) => {
//                     let name = item?.name[0]?.toUpperCase() + item?.name.slice(1)?.toLowerCase();
//                     return (
//                         <div key={item?.id} className='wedding-img-wrapper' onClick={() => handleWeddingInfo(item)}>
//                             <div className='wedding-img-container'>
//                                 <img className='wedding-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="Wedding" />
//                             </div>
//                             <div className='wedding-img-text'>{name}</div>
//                         </div>
//                     )
//                 })}
//                 {(lastIndex < (data?.length || 0) - 1) && (
//                     <div onClick={() => { handleForwardIcon() }} className='wedding-img-right-icon'>
//                         <img src={rightIcon} />
//                     </div>
//                 )}
//             </div>
//         </div>

//     )
// }
export const WeddingSpecial = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);
  const [data, setData] = useState([]);
  const context = useContext(AuthContext);
  const sweetsInfo = context?.setSweetsInfo;
  const navigate = useNavigate();

  const weddingSpecialList = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
        params: { isWedding: true },
      })
      .then((res) => {
        setData(res?.data?.sweetsData || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    weddingSpecialList();
  }, []);

  const handleForwardIcon = () => {
    let totalItems = data?.length || 0;
    const nextStart = lastIndex + 1;
    const nextLast = lastIndex + 3;
    if (nextStart < totalItems) {
      setStartIndex(nextStart);
      setLastIndex(Math.min(nextLast, totalItems - 1));
    }
  };

  const handlePrev = () => {
    const prevStart = Math.max(0, startIndex - 3);
    const prevLast = Math.max(2, startIndex - 1);

    setStartIndex(prevStart);
    setLastIndex(prevLast);
  };

  const handleWeddingInfo = (item) => {
    sweetsInfo(item);
    navigate(`/sweets-info/${item?._id}/home`);
  };

  return (
    <div className="wedding">
      <div className="wedding-top">
        <div className="wedding-left-text">Wedding special</div>
        <Link
          to="/sweets"
          state={{ filter: "wedding" }}
          className="wedding-right-text"
        >
          See More
        </Link>
      </div>

      <div className="wedding-img-list">
        {data?.length > 0 ? (
          <>
            {startIndex > 0 && (
              <div onClick={handlePrev} className="wedding-img-left-icon">
                <img src={leftIcon} alt="prev" />
              </div>
            )}

            {data
              .slice(startIndex, lastIndex + 1)
              .map((item) => {
                let name =
                  item?.name[0]?.toUpperCase() +
                  item?.name.slice(1)?.toLowerCase();
                return (
                  <div
                    key={item?._id}
                    className="wedding-img-wrapper"
                    onClick={() => handleWeddingInfo(item)}
                  >
                    <div className="wedding-img-container">
                      <img
                        className="wedding-img"
                        src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`}
                        alt="Wedding"
                      />
                    </div>
                    <div className="wedding-img-text">{name}</div>
                  </div>
                );
              })}

            {lastIndex < data.length - 1 && (
              <div
                onClick={handleForwardIcon}
                className="wedding-img-right-icon"
              >
                <img src={rightIcon} alt="next" />
              </div>
            )}
          </>
        ) : (
          <div style={{ height: "200px" }} /> // ✅ placeholder for animation observer
        )}
      </div>
    </div>
  );
};
