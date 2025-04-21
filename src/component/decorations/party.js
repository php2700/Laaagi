import { useEffect, useState } from 'react';
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import './index.css'
import { Link } from 'react-router-dom';
import { Model } from './model';
import { decorationCategory } from '../category';
import axios from 'axios';

const decorationType = [
    { name: 'Marriage', url: '/decorations' },
    { name: 'Birthday', url: '/bithday' },
    { name: 'Mehndi', url: '/mehndi' },
    { name: 'Room Decor', url: '/room-decor' },
    { name: 'Party', url: '/party' },
]

export const Party = () => {
    const [open, setOpen] = useState(false)
    const [imgData, setImgData] = useState();
    const [data, setData] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)

    const handleForwardIcon = () => {
        const totalItems = decorationType?.length || 0;
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


    const decorationList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/decoration_list`, {
            params: {
                category: decorationCategory[3]
            }
        })
            .then((res) => {
                setData(res?.data?.decorationData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        decorationList()
    }, [])

    const handleModel = (imgData) => {
        setImgData(imgData)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className='decorations' >
            <div className='decorations-header'>
                {
                    isMobile ?
                        <>
                            {startIndex > 0 &&
                                <div onClick={handlePrev}><img src={leftIcon} /></div>
                            }
                            {decorationType?.slice(startIndex, lastIndex + 1)?.map((ele) => (
                                <div><Link to={ele.url} >{ele?.name}</Link></div>
                            ))}
                            {(lastIndex < (decorationType?.length || 0) - 1) &&
                                <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                            }
                        </> :
                        <>
                            {decorationType?.map((ele) => (
                                <div><Link to={ele.url} >{ele?.name}</Link></div>
                            ))}
                        </>
                }
            </div>
            <div className='decorations-content'>
                <div className='decorations-content-list'>
                    {data?.map((ele) => (
                        <div className='decorations-content-img' onClick={() => handleModel(ele)}>
                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                            <div className='decorations-name'>{ele?.category}</div>
                        </div>
                    ))}
                </div>
            </div>
            <Model
                open={open}
                onClose={handleClose}
                data={imgData}
            />
        </div>
    )
}