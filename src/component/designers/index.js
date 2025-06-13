import { useEffect, useState } from 'react';

import './index.css'
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)


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
                            {/* {startIndex > 0 &&
                                <div onClick={handlePrev}><img src={leftIcon} /></div>
                            } */}
                            {/* {designerHeader?.slice(startIndex, lastIndex + 1)?.map((ele) => ( */}
                            {designerHeader?.map((ele) => (
                                <div className={ele.category == category ? 'active-url' : ''} onClick={() => handleUrl(ele)} >{ele?.name}</div>
                            ))}
                            {/* {(lastIndex < (designerHeader?.length || 0) - 1) &&
                                <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                            } */}
                        </> :
                        <>
                            {designerHeader?.map((ele) => (
                                // <div><Link to={ele.url} >{ele?.name}</Link></div>
                                <div className={ele.category == category ? 'active-url' : ''} onClick={() => handleUrl(ele)} >{ele?.name}</div>
                            ))}
                        </>
                }
            </div>
            <div className='designers-content'>
                <div className='designers-content-list'>
                    {data?.map((ele) => {
                        let name = ele?.name[0]?.toUpperCase() + ele?.name.slice(1)?.toLowerCase();
                        return (
                            <div className='designer-parent-content' onClick={() => handleModel(ele)}>
                                <div className='designers-content-img' >
                                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                </div>
                                <div className='designers-name'>{name}</div>
                            </div>
                        )
                    })}
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