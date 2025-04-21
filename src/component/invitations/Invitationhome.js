
import React, { useState } from 'react';
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

const placeholderDiagram = "https://via.placeholder.com/100x60.png?text=Diagram";
const boxType1Diagram = placeholderDiagram;
const section1Diagram = placeholderDiagram;

export const Invitationhome = () => {
  const location = useLocation();
  const invitation = location?.state?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
        <div className='invitation-size-list'>
          <div><img className='invittions-size-img' src={Rectangle} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:500gm</div>
          </div>
        </div>
        <div className='invitation-size-list'>
          <div><img className='invitation-second-img' src={boxSize2} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:500gm</div>
          </div>
        </div>
        <div className='invitation-size-list'>
          <div><img className='invitation-third-img' src={boxSize3} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:500gm</div>
          </div>
        </div>
        <div className='invitation-size-list'>
          <div><img className='invittions-size-img' src={Rectangle} /></div>
          <div>
            <div className='invitation-len-h'>L:50cm</div>
            <div className='invitation-len-h'>W:50cm</div>
            <div className='invitation-box-we'>Weight:500gm</div>
          </div>
        </div>
      </div>
      <div className='invitation-box-header'>
        <div className='invitation-box-type-header'> select box type</div>
        <div className='invitation-box-type' >
          <div className='invittion-box-detail'>
            <div className='invitation-box-numbers'>1</div>
            <div className='invitation-box-name'> Normal Box</div>
            <div className='invitation-box-type-img'><img src={Rectangle} /></div>
            <div className='invitation-box-desc'>Lorem Ipsum is simply dummy terxt for the printing</div>
          </div>
          <div className='invittion-box-detail'>
            <div className='invitation-box-numbers'>2</div>
            <div className='invitation-box-name'>4 Section inbox</div>
            <div className='invitation-box-type-img'><img src={section2} /></div>
            <div className='invitation-box-desc'>this is the dummy content and the </div>
          </div>
          <div className='invittion-box-detail'>
            <div className='invitation-box-numbers'>3</div>
            <div className='invitation-box-name'>3 Section in box</div>
            <div className='invitation-box-type-img'><img src={section3} /></div>
            <div className='invitation-box-desc'>this is the dummy content</div>
          </div>
          <div className='invittion-box-detail'>
            <div className='invitation-box-numbers'>4</div>
            <div className='invitation-box-name'>Special box</div>
            <div className='invitation-box-type-img'><img src={section4} /></div>
            <div className='invitation-box-desc'>this is the dummy content</div>
          </div>
        </div>
      </div>
      <div className='invitation-select-sweet-box-list'>
        <div className='invitation-box-select-header'>
          <div >sections</div>
          <div>sweets</div>
          <div>Price</div>
        </div>
        <div className='invitation-select-arrow'>
          <div className='invitation-section-align'>
            <div><img src={sweet1Img} /></div>
            <div><img src={leftArrow} /></div>
            <div>
              <Link to='/sweets'>
                <img className='select-sweet-img' src={selectSweet} />
              </Link>
            </div>
          </div>
          <div className='invitation-select-box-sweet-price'>120</div>
        </div>
        <div className='invitation-select-arrow'>
          <div className='invitation-section-align'>
            <div><img src={sweet2Img} /></div>
            <div><img src={leftArrow} /></div>
            <div >
              <Link to='/sweets'>
                <img className='select-sweet-img' src={selectSweet} />
              </Link>
            </div>
          </div>
          <div className='invitation-select-box-sweet-price' >120</div>
        </div>
        <div className='invitation-select-arrow'>
          <div className='invitation-section-align'>
            <div><img src={sweet3Img} /></div>
            <div><img src={leftArrow} /></div>
            <div>
              <Link to='/sweets'>
                <img className='select-sweet-img' src={selectSweet} />
              </Link>
            </div>
          </div>
          <div className='invitation-select-box-sweet-price'>120</div>
        </div>
        <div className='invitation-select-arrow'>
          <div className='invitation-section-align'>
            <div><img src={sweet4Img} /></div>
            <div><img src={leftArrow} /></div>
            <div>
              <Link to='/sweets'>
                <img className='select-sweet-img' src={selectSweet} />
              </Link>
            </div>
          </div>
          <div className='invitation-select-box-sweet-price'>120</div>
        </div>
      </div>
      <div className='invitation-total'>
        <div>Total</div>
        <div>120</div>
      </div>
      <div className='invitation-next'>
        <Link to='/sweets'>Next</Link>
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