import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Invitationhome.css';
import Rectangle from "../../assets/invitations/type-box-1.png"
import boxSize2 from '../../assets/invitations/type-box-2.png'
import boxSize3 from "../../assets/invitations/type-box-3.png"
import sweet1Img from "../../assets/invitations/sweet-1.jpg"
import sweet2Img from "../../assets/invitations/sweet-2.jpg"
import sweet3Img from "../../assets/invitations/sweet-3.jpg"
import sweet4Img from "../../assets/invitations/sweet-4.jpg"
import leftArrow from "../../assets/invitations/arrow-left.png"
import section2 from "../../assets/invitations/section-type-2.png"
import section4 from "../../assets/invitations/section-4.png"
import section3 from "../../assets/invitations/box-3.jpg"
import OneImg from "../../assets/invitations/one.jpg"
import section1One from '../../assets/invitations/section-3-one.jpg';
import section3two from "../../assets/invitations/section-3-two.jpg"
import section3three from "../../assets/invitations/section-3-three.jpg"
import specialBox1 from "../../assets/invitations/special-1.jpg"
import specialBox2 from "../../assets/invitations/special-2.jpg"
import specialBox3 from "../../assets/invitations/special-3.jpg"
import specialBox4 from "../../assets/invitations/special-4.jpg"
import specialBox5 from "../../assets/invitations/special-5.jpg"
import selectSweet from "../../assets/invitations/select-sweet.jpg"
import rightArrow from "../../assets/invitations/right-icon.png"
import axios from 'axios';
import { Logout } from '../header/logout';
import backArrow from "../../assets/sweet/left_arrow.png"



const sectionBox4 = [
    { name: 'section_box4', id: 1, sectionImg: sweet1Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'section_box4', id: 2, sectionImg: sweet2Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'section_box4', id: 3, sectionImg: sweet3Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'section_box4', id: 4, sectionImg: sweet4Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const normalBox = [
    { name: "normal_box", id: 1, sectionImg: OneImg, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const sectionBox3 = [
    { name: 'section_box3', id: 1, sectionImg: section1One, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'section_box3', id: 2, sectionImg: section3two, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'section_box3', id: 3, sectionImg: section3three, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const specialBox = [
    { name: 'special_box', id: 1, sectionImg: specialBox1, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'special_box', id: 2, sectionImg: specialBox2, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'special_box', id: 3, sectionImg: specialBox3, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'special_box', id: 4, sectionImg: specialBox4, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
    { name: 'special_box', id: 5, sectionImg: specialBox5, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const boxType = [
    { id: 1, number: 1, boxName: 'Normal Box', boxImg: Rectangle, boxDesc: 'Lorem Ipsum is simply dummy terxt for the printing' },
    { id: 2, number: 2, boxName: '4 Section in box', boxImg: section2, boxDesc: 'this is the dummy content and the' },
    { id: 3, number: 3, boxName: '3 Section in box', boxImg: section3, boxDesc: 'Lorem Ipsum is simply dummy' },
    { id: 4, number: 4, boxName: 'Special box', boxImg: section4, boxDesc: 'Lorem Ipsum is simply' },
]

export const ViewHistory = () => {
    const { _id } = useParams()
    const navigate = useNavigate();
    const [invitation, setInvitation] = useState({})
    const token = localStorage.getItem('token');
    const [amounts, setAmounts] = useState([])
    const [weight, setWeight] = useState();

    const getPaymentData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/payment-data/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((res) => {
            const response = res?.data?.paymentHistory[0];
            const newDate = new Date(response?.createdAt);
            const formatDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
            response.createdAt = formatDate;
            setWeight(response?.weight)
            setAmounts(response?.invAmounts);
            setInvitation(response);
        }).catch((error) => {
            if (error?.response?.data?.Message === 'jwt expired') {
                Logout()
            }
            console.log(error)
        })
    }

    useEffect(() => {
        getPaymentData()
    }, [_id])

    // const weight = useSelector((state) => state.weight?.value);

    const handleBack = () => {
        navigate('/payment-history')
    }

    console.log(invitation, 'sss')
    return (
        <div className="invitation-details-container">
            <div className='payment-back' onClick={handleBack} ><img src={backArrow} />back</div>
            <div className="top-section">
                <div className="image-container">
                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.invitationImg}`} alt={`${invitation?.invitationImg} Invitation Box`} className="invitation-image" />
                </div>
                <div className="invitation-description">
                    <h2>{invitation?.invitationName} (Rs. {invitation?.boxAmount}/-)</h2>
                    <p className="description-label">Description</p>
                    <p>{invitation?.invDesc}</p>
                </div>
            </div>
            <div className='select-size-header'>Select size of the box</div>
            <div className='invitation-size-box'>
                <div className={weight != 750 && weight != 1000 && weight != 250 ? 'right-icon-arrow' : ''} >
                    {weight != 750 && weight != 1000 && weight != 250 ?
                        <div className='invitation-icon-shift'><img src={rightArrow} /></div> : <></>
                    }
                    <div className='invitation-size-list'>
                        <div><img className='invittions-size-img' src={Rectangle} /></div>
                        <div>
                            <div className='invitation-len-h'>L:50cm</div>
                            <div className='invitation-len-h'>W:50cm</div>
                            <div className='invitation-box-we'>Weight:500gm</div>
                        </div>
                    </div>
                </div>
                <div className={weight == 750 ? 'right-icon-arrow' : ''} >
                    {weight == 750 &&
                        <div className='invitation-icon-shift'><img src={rightArrow} /></div>
                    }

                    <div className='invitation-size-list' >
                        <div><img className='invitation-second-img' src={boxSize2} /></div>
                        <div>
                            <div className='invitation-len-h'>L:50cm</div>
                            <div className='invitation-len-h'>W:50cm</div>
                            <div className='invitation-box-we'>Weight:750gm</div>
                        </div>
                    </div>
                </div>
                <div className={weight == 1000 ? 'right-icon-arrow' : ''} >
                    {weight == 1000 &&
                        <div className='invitation-icon-shift' ><img src={rightArrow} /></div>
                    }
                    <div className='invitation-size-list' >
                        <div ><img className='invitation-third-img' src={boxSize3} /></div>
                        <div>
                            <div className='invitation-len-h'>L:50cm</div>
                            <div className='invitation-len-h'>W:50cm</div>
                            <div className='invitation-box-we'>Weight:1000gm</div>
                        </div>
                    </div>
                </div>
                <div className={weight == 250 ? 'right-icon-arrow' : ''} >
                    {weight == 250 &&
                        <div className='invitation-icon-shift'><img src={rightArrow} /></div>
                    }
                    <div className='invitation-size-list' >
                        <div><img className='invittions-size-img' src={Rectangle} /></div>
                        <div>
                            <div className='invitation-len-h'>L:50cm</div>
                            <div className='invitation-len-h'>W:50cm</div>
                            <div className='invitation-box-we'>Weight:250gm</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='invitation-box-header'>
                <div className='invitation-box-type-header'> select box type</div>
                <div className='invitation-box-type' >
                    {boxType?.map((ele) => (
                        <div className={invitation.boxName == ele?.boxName && 'invittion-box-container'}  >
                            {
                                invitation.boxName == ele?.boxName && <div className='invitation-icon-shift'><img src={rightArrow} /></div>}
                            <div className='invittion-box-detail' >
                                <div className='invitation-box-numbers'>{ele?.number}</div>
                                <div className='invitation-box-name'> {ele.boxName}</div>
                                <div className='invitation-box-type-img'><img src={ele?.boxImg} /></div>
                                <div className='invitation-box-desc'>{ele?.boxDesc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='invitation-select-sweet-box-list'>
                <div className='invitation-box-select-header'>
                    <div >sections</div>
                    <div>sweets</div>
                    <div>Price</div>
                </div>
                {invitation.boxName == 'Normal Box' ?
                    normalBox?.map((ele, index) => (
                        <div className='invitation-select-arrow'>
                            <div className='invitation-section-align'>
                                <div><img src={ele?.sectionImg} /></div>
                                <div><img src={ele?.arrow} /></div>
                                <div>
                                    {invitation?.sweets?.map((ele) => {
                                        if (ele.index == index) return <div>{ele?.name}</div>
                                    })}
                                </div>
                            </div>


                            <div className='invitation-select-box-sweet-price'>  {
                                (amounts[index] ?? 0)
                            }
                            </div>

                        </div>
                    )) : (invitation?.boxName == '4 Section in box') ?
                        sectionBox4?.map((ele, index) => (
                            <div className='invitation-select-arrow'>
                                <div className='invitation-section-align'>
                                    <div><img src={ele?.sectionImg} /></div>
                                    <div><img src={ele?.arrow} /></div>
                                    <div>
                                        {invitation?.sweets?.map((ele) => {
                                            if (ele.index == index) return <div>{ele?.name}</div>
                                        })}
                                    </div>
                                </div>
                                <div className='invitation-select-box-sweet-price'>
                                    {amounts[index] ?? 0}
                                </div>
                            </div>
                        )) : (invitation.boxName == '3 Section in box') ?
                            sectionBox3?.map((ele, index) => (
                                <div className='invitation-select-arrow'>
                                    <div className='invitation-section-align'>
                                        <div><img src={ele?.sectionImg} /></div>
                                        <div><img src={ele?.arrow} /></div>
                                        <div>
                                            {invitation?.sweets?.map((ele) => {
                                                if (ele.index == index) return <div>{ele?.name}</div>
                                            })}
                                        </div>
                                    </div>


                                    <div className='invitation-select-box-sweet-price'>  {
                                        (amounts[index] ?? 0)

                                    }</div>

                                </div>
                            )) :
                            specialBox?.map((ele, index) => (
                                <div className='invitation-select-arrow'>
                                    <div className='invitation-section-align'>
                                        <div><img src={ele?.sectionImg} /></div>
                                        <div><img src={ele?.arrow} /></div>
                                        <div>
                                            {invitation?.sweets?.map((ele) => {
                                                if (ele.index == index) return <div>{ele?.name}</div>
                                            })}
                                        </div>
                                    </div>


                                    <div className='invitation-select-box-sweet-price'>  {
                                        (amounts[index] ?? 0)

                                    }</div>

                                </div>
                            ))
                }
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>GUEST </th>
                            <th >Address </th>
                            <th>WEIHGT</th>
                            <th>PAYMENT_DATE</th>
                            <th >Box-Quantity </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invitation.guest?.map((ele) => (
                                <tr >
                                    <td>
                                        {ele?.name}
                                    </td>
                                    <td>
                                        {ele.address}
                                    </td>
                                    <td>{invitation.weight} g</td>
                                    <td>{invitation?.createdAt}</td>
                                    <td>{ele?.quantity}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="pay-button-container">
                Total Amount : {invitation?.amount} Rs. /-
            </div>
        </div>
    );
};