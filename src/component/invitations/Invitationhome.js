
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import selectSweet from "../../assets/invitations/select-sweet.jpg"
import { AuthContext } from '../context';


const sectionBox4 = [
  { name: 'section_box4', id: 1, sectionImg: sweet1Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'section_box4', id: 2, sectionImg: sweet2Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'section_box4', id: 3, sectionImg: sweet3Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'section_box4', id: 4, sectionImg: sweet4Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const normalBox = [
  { name: "normal_box", id: 1, sectionImg: sweet1Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const sectionBox3 = [
  { name: 'section_box3', id: 1, sectionImg: sweet1Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'section_box3', id: 2, sectionImg: sweet2Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'section_box3', id: 3, sectionImg: sweet3Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const specialBox = [
  { name: 'special_box', id: 1, sectionImg: sweet1Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'special_box', id: 2, sectionImg: sweet2Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'special_box', id: 3, sectionImg: sweet3Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'special_box', id: 4, sectionImg: sweet4Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
  { name: 'special_box', id: 4, sectionImg: sweet4Img, arrow: leftArrow, sweetImg: selectSweet, price: 120, url: '/sweets' },
]

const boxType = [
  { id: 1, number: 1, boxName: 'Normal Box', boxImg: Rectangle, boxDesc: 'Lorem Ipsum is simply dummy terxt for the printing' },
  { id: 2, number: 2, boxName: '4 Section inbox', boxImg: section2, boxDesc: 'this is the dummy content and the' },
  { id: 3, number: 3, boxName: '3 Section in box', boxImg: section3, boxDesc: 'Lorem Ipsum is simply dummy' },
  { id: 4, number: 4, boxName: 'Special box', boxImg: section4, boxDesc: 'Lorem Ipsum is simply' },
]

export const Invitationhome = () => {
  const location = useLocation();
  const context = useContext(AuthContext);
  const setAmounts = context?.setAmounts;
  const amounts = context?.amounts;
  const invitation = context?.selectSweet;
  const [invitationId, setinvitationId] = useState(invitation?._id)
  const getSweet = location?.state;
  const [selectedSweet, setSelectedSweet] = useState(getSweet)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [id, setId] = useState(1)
  const [weight, setWeight] = useState('500gm')


  useEffect(() => {
    if (selectedSweet?.index >= 0 && selectedSweet?.index < amounts.length) {
      const updatedAmounts = [...amounts];
      updatedAmounts[selectedSweet?.index] = selectedSweet?.amount;
      setAmounts(updatedAmounts);
    }
  }, [selectedSweet]);

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

  const handleBoxType = (id) => {
    setId(id)
  }

  const handleWeight = (weight) => {
    setWeight(weight)
  }

  return (
    <div className="invitation-details-container">
      <div className='back-button'><Link to='/invitation'>back</Link></div>
      <div className="breadcrumb"> Home Invitation</div>

      <div className="top-section">
        <div className="image-container">
          <img src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.image}`} alt={`${invitation?.image} Invitation Box`} className="invitation-image" />
        </div>
        <div className="invitation-description">
          <h2>{invitation?.name}</h2>
          <p className="description-label">Description</p>
          <p>{invitation?.description}</p>
          <button className="customize-btn" onClick={handleOpenModal}>
            Customize
          </button>
        </div>
      </div>
      <div className='select-size-header'>Select size of the box</div>
      <div className='invitation-size-box'>
        <div className='invitation-size-list' onClick={() => handleWeight('500gm')}>
          <div><img className='invittions-size-img' src={Rectangle} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:500gm</div>
          </div>
        </div>
        <div className='invitation-size-list' onClick={() => handleWeight('750gm')}>
          <div><img className='invitation-second-img' src={boxSize2} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:750gm</div>
          </div>
        </div>
        <div className='invitation-size-list' onClick={() => handleWeight('1000gm')}>
          <div><img className='invitation-third-img' src={boxSize3} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:1000gm</div>
          </div>
        </div>
        <div className='invitation-size-list' onClick={() => handleWeight('250gm')}>
          <div><img className='invittions-size-img' src={Rectangle} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:250gm</div>
          </div>
        </div>
      </div>
      <div className='invitation-box-header'>
        <div className='invitation-box-type-header'> select box type</div>
        <div className='invitation-box-type' >
          {boxType?.map((ele) => (
            <div className='invittion-box-detail' onClick={() => handleBoxType(ele.id)}>
              <div className='invitation-box-numbers'>{ele?.number}</div>
              <div className='invitation-box-name'> {ele.boxName}</div>
              <div className='invitation-box-type-img'><img src={ele?.boxImg} /></div>
              <div className='invitation-box-desc'>{ele?.boxDesc}</div>
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
                  <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name }} >
                    <img className='select-sweet-img' src={ele?.sweetImg} />
                  </Link>
                </div>
              </div>
              {console.log(normalBox.name, "3333", selectedSweet?.name)}
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
                    <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name }}>
                      <img className='select-sweet-img' src={ele?.sweetImg} />
                    </Link>
                  </div>
                </div>
                {console.log(sectionBox4.name, "3333", selectedSweet?.name)}
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
                      <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name }}>
                        <img className='select-sweet-img' src={ele?.sweetImg} />
                      </Link>
                    </div>
                  </div>
                  <div className='invitation-select-box-sweet-price'>{
                    (selectedSweet?.invitationId === invitationId && ele.name === sectionBox3?.name)
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
                      <Link to={ele?.url} state={{ data: true, idx: index, invitationId: invitationId, name: ele?.name }}>
                        <img className='select-sweet-img' src={ele?.sweetImg} />
                      </Link>
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
        <div>120</div>
      </div>
      <div className='invitation-next'>
        <Link to='/invitation-GuestList' state={{ amount: 120 }} >Next</Link>
      </div>








      <CustomizationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFormSubmitSuccess={handleFormSubmitSuccess}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};