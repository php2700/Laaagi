import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Invitationhome.css';
import CustomizationModal from './CustomizationModal';
import SuccessModal from './SuccessModal';
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
import { AuthContext } from '../context';
import rightArrow from "../../assets/invitations/right-icon.png"
import { useDispatch, useSelector } from 'react-redux';
import { chnageWeight } from '../redux/weightSlice';


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
  { name: 'special_box', id: 4, sectionImg: specialBox5, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const boxType = [
  { id: 1, number: 1, boxName: 'Normal Box', boxImg: Rectangle, boxDesc: 'Lorem Ipsum is simply dummy terxt for the printing' },
  { id: 2, number: 2, boxName: '4 Section in box', boxImg: section2, boxDesc: 'this is the dummy content and the' },
  { id: 3, number: 3, boxName: '3 Section in box', boxImg: section3, boxDesc: 'Lorem Ipsum is simply dummy' },
  { id: 4, number: 4, boxName: 'Special box', boxImg: section4, boxDesc: 'Lorem Ipsum is simply' },
]

export const Invitationhome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AuthContext);
  const setAmounts = context?.setAmounts;
  const setTotalAmountInv = context?.setTotalAmountInv
  const amounts = context?.amounts;
  const boxName = context?.boxName;
  const setBoxName = context?.setBoxName;
  const invitation = context?.selectSweet;
  const setPaymentHistory = context?.setPaymentHistory;
  const paymentHistory = context?.paymentHistory;


  const [price, serPrice] = useState(invitation?.price)
  const [invitationId, setinvitationId] = useState(invitation?._id)
  const getSweet = location?.state;
  const [selectedSweet, setSelectedSweet] = useState(getSweet)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [id, setId] = useState(1)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState([])
  const [lastURL, setLastURL] = useState(sessionStorage.getItem('lastURL'));


  const weight = useSelector((state) => state.weight?.value);
  const dispatch = useDispatch()

  const calculateTotalAmount = (price, weight) => {
    if (boxName == 'Normal Box') {
      return parseInt(price / 1000 * weight)
    }
    else if (boxName == '4 Section in box') {
      return parseInt((price / 1000) * weight / 4)
    }
    else if (boxName == '3 Section in box') {
      return parseInt((price / 1000) * weight / 3)
    } else {
      return parseInt((price / 1000) * weight / 5)
    }
  }

  const validate = () => {
    const newError = []

    if (boxName == 'Normal Box') {
      if (amounts[0] == 0) {
        newError.push({
          id: 0,
          boxName: 'Normal Box'
        })
      }
    }
    else if (boxName == '4 Section in box') {
      if (amounts[0] == 0) {
        newError.push({
          id: 0,
          boxName: '4 Section in box'
        })
      }
      if (amounts[1] == 0) {
        newError.push({
          id: 1,
          boxName: '4 Section in box'
        })
      }
      if (amounts[2] == 0) {
        newError.push({
          id: 2,
          boxName: '4 Section in box'
        })
      }
      if (amounts[3] == 0) {
        newError.push({
          id: 3,
          boxName: '4 Section in box'
        })
      }
    }
    else if (boxName == '3 Section in box') {
      if (amounts[0] == 0) {
        newError.push({
          id: 0,
          boxName: '3 Section in box'
        })
      }
      if (amounts[1] == 0) {
        newError.push({
          id: 1,
          boxName: '3 Section in box'
        })
      }
      if (amounts[2] == 0) {
        newError.push({
          id: 2,
          boxName: '3 Section in box'
        })
      }
    } else {
      if (amounts[0] == 0) {
        newError.push({
          id: 0,
          boxName: 'Special box'
        })
      }
      if (amounts[1] == 0) {
        newError.push({
          id: 1,
          boxName: 'Special box'
        })
      }
      if (amounts[2] == 0) {
        newError.push({
          id: 2,
          boxName: 'Special box'
        })
      }
      if (amounts[3] == 0) {
        newError.push({
          id: 3,
          boxName: 'Special box'
        })
      }
      if (amounts[4] == 0) {
        newError.push({
          id: 4,
          boxName: 'Special box'
        })
      }
    }

    setError(newError);
    return newError?.length > 0
  }


  const handleAmount = () => {
    if (validate()) {
      return;
    }
    setTotalAmountInv(total + price)
    navigate('/invitation-GuestList', { state: { amount: total + price } })
  }

  useEffect(() => {
    if (selectedSweet?.index >= 0 && selectedSweet?.index < amounts?.length) {
      const updatedAmounts = [...amounts];
      const calculateAmount = calculateTotalAmount((selectedSweet?.amount)?.split("/")[0], weight);
      updatedAmounts[selectedSweet?.index] = calculateAmount;
      setId(getSweet?.showId)
      setAmounts(updatedAmounts);

      const updatedHistory = paymentHistory?.filter((ele) => ele?.index != selectedSweet?.index) || [];
      updatedHistory.push({ index: selectedSweet?.index, amount: calculateAmount, name: selectedSweet?.sweetName })
      setPaymentHistory(updatedHistory)
    }
  }, [selectedSweet]);


  useEffect(() => {
    setTotal(amounts?.reduce((item1, item2) => item1 + item2))
  }, [amounts])

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccessModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmitSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleBoxType = (ele) => {
    setTotalAmountInv(0)
    setPaymentHistory([])
    setAmounts([0, 0, 0, 0, 0])
    setBoxName(ele?.boxName)
    setId(ele?.id)
  }



  const handleWeight = (weight) => {
    // setWeight(weight)   ----->  used for context
    dispatch(chnageWeight(weight))      //------>  redux
  }

  const handleBack = () => {
    setTotalAmountInv(0)
    setAmounts([0, 0, 0, 0, 0])
    setPaymentHistory([])
    // setWeight(500)    ----->context   
    dispatch(chnageWeight(500))   // redux
    setBoxName('Normal Box');
    const lastURL = sessionStorage.getItem('lastURL')
    // navigate('/invitation')
    navigate(`${lastURL}`);
  }

  const handleHome = () => {
    const lastUrl = sessionStorage.getItem('lastURL');
    navigate(`${lastUrl}`)
  }

  useEffect(() => {
    console.log(lastURL, 'aaaaaaaaaaa')
    if (lastURL && lastURL !== '/invitation-detail') {
      setBoxName('Normal Box');
      setAmounts([0, 0, 0, 0, 0]);
    }
  }, [lastURL]);


  return (
    <div className="invitation-details-container">
      <div className='back-button' onClick={handleBack}>back</div>
      <div className="invitation-detils-home-container">
        <div className="invitation-detail-home" onClick={handleHome}>Home</div>
        <div> &nbsp;> &nbsp;Detail</div>
      </div>
      <div className="top-section">
        <div className="image-container">
          <img src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.image}`} alt={`${invitation?.image} Invitation Box`} className="invitation-image" />
        </div>
        <div className="invitation-description">
          <h2>{invitation?.name} (Rs. {price}/-)</h2>
          <p className="description-label">Description</p>
          <p>{invitation?.description}</p>
          <button className="customize-btn" onClick={handleOpenModal}>
            Customize
          </button>
        </div>
      </div>
      <div className='select-size-header'>Select size of the box</div>
      <div className='invitation-size-box'>
        <div className={weight != 750 && weight != 1000 && weight != 250 ? 'right-icon-arrow' : ''} >
          {weight != 750 && weight != 1000 && weight != 250 ?
            <div className='invitation-icon-shift'><img src={rightArrow} /></div> : <></>
          }
          <div className='invitation-size-list' onClick={() => handleWeight(500)}>
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

          <div className='invitation-size-list' onClick={() => handleWeight(750)}>
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
          <div className='invitation-size-list' onClick={() => handleWeight(1000)}>
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
          <div className='invitation-size-list' onClick={() => handleWeight(250)}>
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
            <div className={boxName == ele?.boxName && 'invittion-box-container'}  >
              {
                boxName == ele?.boxName && <div className='invitation-icon-shift'><img src={rightArrow} /></div>}
              <div className='invittion-box-detail' onClick={() => handleBoxType(ele)}>
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
        {id == 1 ?
          normalBox?.map((ele, index) => (
            <div className='invitation-select-arrow'>
              <div className='invitation-section-align'>
                <div><img src={ele?.sectionImg} /></div>
                <div><img src={ele?.arrow} /></div>
                <div>
                  <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name, id: id }} >
                    <img className='select-sweet-img' src={ele?.sweetImg} />
                  </Link>
                  {error?.some((item) => item.id == index && item.boxName == 'Normal Box') && <div className='error-color'>please select sweet</div>}
                </div>
              </div>
              <div className='invitation-select-box-sweet-price'>  {
                (selectedSweet?.invitationId === invitationId && ele.name === selectedSweet?.name)
                  ? (amounts[index] ?? 0)
                  : '₹0'
              }</div>
            </div>
          )) : (id == 2) ?
            sectionBox4?.map((ele, index) => (
              <div className='invitation-select-arrow'>
                <div className='invitation-section-align'>
                  <div><img src={ele?.sectionImg} /></div>
                  <div><img src={ele?.arrow} /></div>
                  <div>
                    <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name, id: id }}>
                      <img className='select-sweet-img' src={ele?.sweetImg} />
                    </Link>
                    {error?.some((item) => item.id == index && item.boxName == '4 Section in box') && <div className='error-color'>please select sweet</div>}
                  </div>
                </div>

                <div className='invitation-select-box-sweet-price'>  {
                  (selectedSweet?.invitationId === invitationId && ele.name === selectedSweet?.name)
                    ? (amounts[index] ?? 0)
                    : '₹0'
                }</div>
              </div>
            )) : (id == 3) ?
              sectionBox3?.map((ele, index) => (
                <div className='invitation-select-arrow'>
                  <div className='invitation-section-align'>
                    <div><img src={ele?.sectionImg} /></div>
                    <div><img src={ele?.arrow} /></div>
                    <div>
                      <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name, id: id }}>
                        <img className='select-sweet-img' src={ele?.sweetImg} />
                      </Link>
                      {error?.some((item) => item.id == index && item.boxName == '3 Section in box') && <div className='error-color'>please select sweet</div>}
                    </div>
                  </div>
                  <div className='invitation-select-box-sweet-price'>{
                    (selectedSweet?.invitationId === invitationId && ele.name === selectedSweet?.name)
                      ? (amounts[index] ?? 0)
                      : '₹0'
                  }</div>
                </div>
              )) :
              specialBox?.map((ele, index) => (
                <div className='invitation-select-arrow'>
                  <div className='invitation-section-align'>
                    <div><img src={ele?.sectionImg} /></div>
                    <div><img src={ele?.arrow} /></div>
                    <div>
                      <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name, id: id }}>
                        <img className='select-sweet-img' src={ele?.sweetImg} />
                      </Link>
                      {error?.some((item) => item.id == index && item.boxName == 'Special box') && <div className='error-color'>please select sweet</div>}
                    </div>
                  </div>
                  <div className='invitation-select-box-sweet-price'>{
                    (selectedSweet?.invitationId === invitationId && ele.name === selectedSweet?.name)
                      ? (amounts[index] ?? `₹0`)
                      : '₹0'
                  }</div>
                </div>
              ))
        }
      </div>
      <div className='invitation-total'>
        <div>Total</div>
        <div>{total + price}</div>
      </div>
      <div className='invitation-next' >
        <div onClick={() => handleAmount()}>
          Next
        </div>
      </div>

      <CustomizationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFormSubmitSuccess={handleFormSubmitSuccess}
        invitationId={invitationId}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};