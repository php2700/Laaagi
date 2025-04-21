
import { useEffect, useState } from 'react';
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"

import './index.css'
import { Link } from 'react-router-dom';
import { designerCategory } from '../category';
import axios from 'axios';

const designerHeader = [
    { name: 'Bridge', url: '/designers' },
    { name: 'groom', url: '/Groom' },
    { name: 'suits', url: '/Suits' },
    { name: 'other', url: '/Other' },

]

export const Other = () => {

    const [data, setData] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)

    const handleForwardIcon = () => {
        const totalItems = designerHeader?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3;
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1));
        }
    }

    const handlePrev = () => {
        const prevStart = Math.max(0, startIndex - 3);
        const prevLast = Math.max(2, startIndex - 1);
        setStartIndex(prevStart);
        setLastIndex(prevLast);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [])


    const designerLsit = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/designers_list`, {
            params: {
                category: designerCategory[3]
            }
        })
            .then((res) => {
                setData(res?.data?.designerData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        designerLsit()
    }, [])

    return (
        <div className='designers' >
            <div className='designers-header'>
                {
                    isMobile ?
                        <>
                            {startIndex > 0 &&
                                <div onClick={handlePrev}><img  src={leftIcon} /></div>
                            }
                            {designerHeader?.slice(startIndex, lastIndex + 1)?.map((ele) => (
                                <div><Link to={ele.url} >{ele?.name}</Link></div>
                            ))}
                            {(lastIndex < (designerHeader?.length || 0) - 1) &&
                                <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                            }
                        </> :
                        <>
                            {designerHeader?.map((ele) => (
                                <div><Link to={ele.url} >{ele?.name}</Link></div>
                            ))}
                        </>
                }
            </div>
            <div className='designers-content'>
                <div className='designers-content-list'>
                    {data?.map((ele) => (
                        <div className='designers-content-img'>
                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                            <div className='designers-name'>{ele?.name}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}