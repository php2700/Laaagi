import './index.css'
import { use, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context'
import { useNavigate } from 'react-router-dom'

export const DiscoverCategory = () => {
    const [discoverData, setDiscoverData] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2)
    const context = useContext(AuthContext);
    const setRecentView = context?.setRecentView;
    const sweetsInfo = context?.setSweetsInfo;
    const navigate = useNavigate();


    const discoverSweetsList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
            params: {
                isSweet: true
            }
        })
            .then((res) => {
                setDiscoverData(res?.data?.sweetsData);
                console.log(res?.data?.sweetsData)
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        discoverSweetsList()
    }, [])


    const handleSweetInfo = (data) => {
        setRecentView(data)

        sweetsInfo(data)    
        // navigate('/sweets-info')
        const url = 'home';
        navigate(`/sweets-info/${data?._id}/${url}`);

    }

    return (
        <div className='discover-category'>
            <div className='discover-category-heading'>
                Discover Categories
            </div>
            <div className='discover-category-left-text'>Sweets
            </div>
            <div className='discover-category-list'>
                {discoverData.slice(startIndex, lastIndex + 1)?.map((item) => (
                    <div key={item?.id} className='discover-category-wrapper'>
                        <img onClick={() => handleSweetInfo(item)} className='discover-category-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                        <div className='discover-category-img-text'>{item?.name}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}