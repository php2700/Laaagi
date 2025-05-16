import './index.css'
import dryFruit from '../../assets/dry_fruit.png'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';



export const Dry_Fruit_Treat = () => {
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [dryFruitData, setDryFruitData] = useState([])
    const context = useContext(AuthContext);
    const setRecentView = context?.setRecentView;
    const sweetsInfo = context?.setSweetsInfo;
    const navigate = useNavigate();

    const dryFruitsList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/dry_fruit_list`, {
        })
            .then((res) => {
                setDryFruitData(res?.data?.dryFruitData);
                console.log(res?.data?.dryFruitData)
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        dryFruitsList()
    }, [])


    const handleForward = () => {
        const totalItems = dryFruitData?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3;

        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1))
        }
    }

    const handleBack = () => {
        const prevStart = Math.max(0, startIndex - 3);
        const prevLast = Math.max(2, lastIndex - 3);
        setStartIndex(prevStart);
        setLastIndex(prevLast);
    }

    const handleDryFruitInfo = (data) => {
        setRecentView(data)

        sweetsInfo(data)
        navigate('/sweets-info')
    }

    return (
        <div className="dry-fruit-treat" >
            <div className='dry-fruit-treat-top' >
                <div className='dry-fruit-treat-left-text'>Dry Fruit Treats</div>
                {/* <div className='dry-fruit-treat-right-text'>See More</div> */}
            </div>
            <div className='dry-fruit-treat-img-list' >
                {
                    (startIndex > 0) && (
                        <div onClick={() => { handleBack() }} className='dry-fruit-treat-left-icon'>
                            <img src={leftIcon} />
                        </div>
                    )
                }
                {dryFruitData?.slice(startIndex, lastIndex + 1)?.map((item) => (
                    <div key={item?.id} className='dry-fruit-treat-img-wrapper'>
                        <div className='dry-fruit-img-container'>
                            <img className='dry-fruit-treat-img' onClick={() => handleDryFruitInfo(item)} src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="dry-fruit-treat" />
                        </div>
                        <div className='dry-fruit-treat-img-text'>{item?.name}</div>
                    </div>
                ))}
                {
                    (lastIndex < dryFruitData?.length - 1) && (
                        <div onClick={() => { handleForward() }} className='dry-fruit-treat-right-icon'>
                            <img src={rightIcon} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}


