import { useEffect, useState } from 'react';
import './index.css'
import { Model } from './model';
import axios from 'axios';

const decorationHeader = [
    { name: 'Marriage', category: 'Marriage' },
    { name: 'Birthday', category: 'BirthDay' },
    { name: 'Mehndi', category: 'Mehndi' },
    { name: 'Room Decor', category: 'Room Decor' },
    { name: 'Party', category: 'Party' }
]

export const Decorations = () => {
    const [open, setOpen] = useState(false)
    const [imgData, setImgData] = useState();
    const [category, setCategory] = useState('Marriage')
    const [decorationData, setDecorationData] = useState([])

    const getDecorationList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/decoration_list`, {
            params: {
                category: category
            }
        })
            .then((res) => {
                console.log(`Data for category: ${category}`, res.data); // <<--- YEH ADD KAREIN
                // Specifically check what res.data.decorationData is for 'Birthday'
                if (category === 'Birthday') {
                    console.log('Birthday API response data:', res.data?.decorationData);
                }
                setDecorationData(res?.data?.decorationData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getDecorationList()
    }, [category])

    const handleModel = (imgData) => {
        setImgData(imgData)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUrl = (ele) => {
        setCategory(ele?.category);
    }

    return (
        <div className='decorations' >
            <div className='decorations-header'>
                {decorationHeader?.map((ele) => (
                    <div className={ele.category == category ? 'active-url' : ''} onClick={() => handleUrl(ele)} >{ele?.name}</div>
                ))}
            </div>
            <div className='decorations-content'>
                <div className='decorations-content-list'>
                    {decorationData?.map((ele) => (
                        <div className='decorations-content-img' onClick={() => handleModel(ele)}>
                            <div className='decoration-img-align' >
                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                            </div>
                            <div className='decorations-name'>{ele?.category}</div>

                        </div>
                    ))}
                </div>
                {!decorationData?.length &&
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