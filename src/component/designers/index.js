import { useEffect, useState } from 'react';
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"

import './index.css'
import { Link } from 'react-router-dom';
import { designerCategory } from '../category';
import axios from 'axios';
import { Model } from './Model';

const designerHeader = [
    { name: 'Bridge', category: 'Bridge' },
    { name: 'Groom', category: 'Groom' },
    { name: 'Suits', category: 'Suits' },
    { name: 'Other', category: 'Other' },

]

export const Designers = () => {
    const [category, setCategory] = useState('Bridge')
    const [open, setOpen] = useState(false)
    const [imgData, setImgData] = useState();
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
                category: category
            }
        })
            .then((res) => {
                setData(res?.data?.designerData);
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleModel = (imgData) => {
        setImgData(imgData)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        designerLsit()
    }, [category])

    const handleUrl = (ele) => {
        setCategory(ele?.category);
    }

    return (
        <div className='designers' >
            <div className='designers-header'>
                {
                    isMobile ?
                        <>
                            {startIndex > 0 &&
                                <div onClick={handlePrev}><img src={leftIcon} /></div>
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
                                // <div><Link to={ele.url} >{ele?.name}</Link></div>
                                <div className={ele} onClick={() => handleUrl(ele)} >{ele?.name}</div>
                            ))}
                        </>
                }
            </div>
            <div className='designers-content'>
                <div className='designers-content-list'>
                    {data?.map((ele) => (
                        <div className='designer-parent-content'>
                            <div className='designers-content-img' onClick={() => handleModel(ele)}>
                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />

                            </div>
                            <div className='designers-name'>{ele?.name}</div>
                        </div>
                    ))}
                </div>

                {!data?.length &&
                    <div className='no-found'>No Data Found</div>
                }
            </div>

            <Model
                open={open}
                onClose={handleClose}
                data={imgData}
            />
        </div>
    )
}