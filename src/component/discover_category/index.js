import './index.css'
import firstSweet from '../../assets/discover/first.png'
import secondSweet from '../../assets/discover/second.png'
import thirdSweet from '../../assets/discover/third.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const DiscoverCategory = () => {
    const [discoverData, setDiscoverData] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2)

    const discoverSweetsList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/discover_sweets_list`)
            .then((res) => {
                setDiscoverData(res?.data?.discoverSweetsData)
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        discoverSweetsList()
    }, [])

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
                        <img className='discover-category-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                        <div className='discover-category-img-text'>{item?.name}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}