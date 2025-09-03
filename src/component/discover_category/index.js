import './index.css'
import { use, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context'
import { useNavigate } from 'react-router-dom'

export const DiscoverCategory = () => {
    const [discoverData, setDiscoverData] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(3)
    const context = useContext(AuthContext);
    const sweetsInfo = context?.setSweetsInfo;
    const navigate = useNavigate();

    const discoverSweetsList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/first-sweet-categroy-wise`, {
        })
            .then((res) => {
                setDiscoverData(res?.data?.sweetsData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        discoverSweetsList()
    }, [])


    const handleSweetInfo = (data) => {

        sweetsInfo(data)
        console.log(data, 'aaa')
        // const url = 'home';
        // navigate(`/sweets-info/${data?._id}/${url}`);
        navigate(`/sweets`, { state: { category: data.category } })

    }

    console.log(discoverData, "discovertdarta")
    return (
        <div className='discover-category'>
            <div className='discover-category-heading'>
                Discover Categories
            </div>
            <div className='discover-category-left-text'>Sweets
            </div>
            <div className='discover-category-list'>
                {discoverData.slice(startIndex, lastIndex + 1)?.map((item) => {

                    let category = item?.category[0]?.toUpperCase() + item?.category.slice(1)?.toLowerCase();
                    return (
                        <div key={item?.id} className='discover-category-wrapper' onClick={() => handleSweetInfo(item)}>
                            {/* <img onClick={() => handleSweetInfo(item)} className='discover-category-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                            <div className='discover-category-img-text'>{category}</div> */}
                              <div className="discover-category-img-container">
                      <img className="discover-category-img" src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="Wedding" />
                      <div className="discover-category-img-overlay">
                        <div className="discover-category-img-text" >{category}</div>
                      </div>
                    </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}