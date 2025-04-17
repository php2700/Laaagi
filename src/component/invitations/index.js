import { useEffect, useState } from 'react';

import './index.css'
import { Link } from 'react-router-dom';
import { filterData, invitationCategory } from '../category';
import axios from 'axios';

export const Invitation = () => {
    const [selectedPrice, setSelectedPrice] = useState('');
    const [data, setData] = useState([])

    const getInvitationList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/invitation_list`, {
            params: {
                category: invitationCategory[0],
                price: selectedPrice
            }
        })
            .then((res) => {
                setData(res?.data?.invitationData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getInvitationList()
    }, [selectedPrice])

    const handleFilter = (data) => {
        setSelectedPrice(data)
    }

    return (
        <div className='invitations' >
            <div className='invitations-header'>
                <div><Link to='/invitation' >Only Invitation</Link></div>
                <div><Link to='/invitation-wooden'>Invitation on Wooden Box</Link></div>
                <div><Link to='/invitation-box'>Invitation on Box</Link></div>
                <div><Link to='/invitation-glass'>Invitation on Glass Box</Link></div>
                <div><Link to='/invitation-misc'>Misc Invitation</Link></div>
            </div>
            <div className='invitations-content'>
                <div className='invitations-price-left'>
                    <div className='invitation-price-header'>Price Range filter</div>
                    {
                        filterData?.map((ele) => (
                            <div className='invitation-price' onClick={() => { handleFilter(ele) }}>{ele}</div>
                        ))
                    }
                </div>
                <div className='invitations-content-header'>
                    <div className='invitation-content-text'> Upload Your Design and get quote for the same</div>
                    <div className='invitation-content-list'>
                        {data?.map((ele) => (
                            <div className='invitation-content-img'>
                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                <div>{ele?.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

//             <div className='invitations-content'>
//                 <div className='invitations-price-left'>
//                     <div className='invitation-price-header'>Price Range filter</div>
//                     {pricefilterList.map(price => (
//                         <div key={price.id} className='invitation-price'>
//                             {price.value}
//                         </div>
//                     ))}
//                 </div>

//                 <div className='invitations-content-header'>
//                     <div className='invitation-content-text'>
//                         Upload Your Design and get quote for the same
//                     </div>

//                     <div className='invitation-content-list'>
//                         {invitationList?.map((ele) => (
//                             <Link
//                                 key={ele.id}
//                                 to={`/invitation/${ele.id}`}
//                                 className='invitation-content-img'
//                             >
//                                 <img src={ele?.img} alt={ele?.name} />
//                                 <div className='decorations-name'>{ele?.name}</div>
//                                 key={ele.discription}
//                                 to={`/invitation/${ele.discription}`}

//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
