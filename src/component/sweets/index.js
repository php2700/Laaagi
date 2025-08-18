
import { useContext, useEffect, useState } from 'react';
import './index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';
import rightArrow from "../../assets/invitations/right-icon.png";
import { toast } from 'react-toastify';
import { AddSweets } from './model';
import MenuIcon from '@mui/icons-material/Menu';
import { sweetFilterData } from '../category';


const sweetsHeader = [
    { id: 'sh1', name: 'Indian Sweets', category: 'Indian Sweets' },
    { id: 'sh2', name: 'Innovative Fusions', category: 'Innovative Fusions' },
    { id: 'sh3', name: 'Savouries', category: 'Savouries' },
    { id: 'sh4', name: 'Dry Fruits', category: 'Dry Fruits' },
]

const INITIAL_CATEGORY = sweetsHeader[0]?.category || 'Indian Sweets';
export const Sweets = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);
    const sweetDropDown = context?.sweetDropDown;
    const setSweetDropDown = context?.setSweetDropDown;
    const sweetsInfo = context?.setSweetsInfo
    const isInvitationSweets = location.state?.data;
    const invitationId = location.state?.invitationId;
    const searchCategory = location.state?.category;
    const name = location.state?.name;
    const index = location.state?.idx;
    const status = location?.state?.status
    const isCart = location?.state?.isCart;
    const id = location.state?.id;
    const cartId = location?.state?.cartId;
    const [invitationselectSweet, setInvitationSelectSweet] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(searchCategory || sweetDropDown || INITIAL_CATEGORY);
    const [isSpecialView, setIsSpecialView] = useState(false);
    const [pageHeading, setPageHeading] = useState("Sweets");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [openModel, setOpenModel] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [selectedPrice, setSelectedPrice] = useState('');
    const [sweetId, setSweetId] = useState()
    const [search, setSearch] = useState();


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) };
    }, []);

    const fetchSweetsData = (fetchForWedding = false) => {
        setData([])
        const params = {};
        if (fetchForWedding) {
            params.isWedding = true;
        } else if (category) {
            params.category = category;
        }
        if (selectedPrice) {
            params.price = selectedPrice
        }
        if (search) {
            params.search = search;
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, { params })
            .then((res) => {
                console.log(res?.data?.sweetsData)
                setData(res?.data?.sweetsData || []);
            }).catch((error) => {
                console.error("Error fetching sweets data:", error);
                setData([]);
            });
    };


    useEffect(() => {
        const filterFromState = location.state?.filter;

        if (filterFromState === 'wedding') {
            setIsSpecialView(true);
            setPageHeading("Wedding Special Sweets");
            fetchSweetsData(true);
        } else {
            setIsSpecialView(false);
            const currentCategoryObj = sweetsHeader.find(h => h.category === category);
            setPageHeading(currentCategoryObj ? currentCategoryObj.name : "Sweets");
            fetchSweetsData(false);
        }
    }, [category, location.state?.filter, selectedPrice, search]);


        useEffect(() => {
        if (sweetDropDown == '') return
        setCategory(sweetDropDown);
    }, [sweetDropDown])


    const handleCategorySelect = (ele) => {
        setCategory(ele?.category);
        setSelectedPrice('')
        if (sweetDropDown) {
            setSweetDropDown('')
        }
    };

    const handleSweetForInvitation = (item) => {
        setOrderId(item?.orderId);
        setInvitationSelectSweet(item);
        setOpenModel(true)
        setSweetId(item._id)
    };



    const handleClose = () => {
        // setOpenModel(false)
        setOrderId()
        setInvitationSelectSweet()
        setOpenModel(false)
        setSweetId()
    }

    console.log(status, 'aaaa')
    const handleInvitationSweetDone = () => {
        const url = 'invitation'
        if (invitationselectSweet) {
            if (isCart) {
                navigate(`/cart-detail/${cartId}/${status}`, {
                    state: { ...invitationselectSweet, sweetName: invitationselectSweet?.name, index: index, invitationId: invitationId, name: name, showId: id, sweetId: sweetId }

                })
            }
            else {
                navigate(`/invitation-detail/${invitationId}/${url}`, {
                    state: { ...invitationselectSweet, sweetName: invitationselectSweet?.name, index: index, invitationId: invitationId, name: name, showId: id, sweetId: sweetId }
                });
            };
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('scrollToNext'));
            }, 500);
        } else {
            toast.error("Please Select Sweet !", {
                position: "bottom-right"
            });
        }
    };

    const handleItemDetailNavigation = (item) => {
        if (sweetsInfo) {
            sweetsInfo(item);
        }
        const url = 'sweets';
        navigate(`/sweets-info/${item?._id}/${url}`);

    };

    const handleFilter = (data) => {
        setSelectedPrice(data)
    }

    return (
        <div className='sweets' >
            {!isSpecialView && (
                <div className='sweets-header'>
                    {/* <div className='sweet-search-parent'> */}
                    <input className='sweet-search' type='search' onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search..' />
                    {/* </div> */}

                    {isMobile ? (
                        <>
                            {sweetsHeader?.map((ele) => (
                                <div
                                    key={ele.id}
                                    className={`sweets-header-item ${ele.category === category ? 'active-url' : ''}`}
                                    onClick={() => handleCategorySelect(ele)}
                                >
                                    {ele?.name}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {sweetsHeader?.map((ele) => (
                                <div
                                    key={ele.id}
                                    className={`sweets-header-item ${ele.category === category ? 'active-url' : ''}`}
                                    onClick={() => handleCategorySelect(ele)}
                                >
                                    {ele?.name}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}


            <div className='main-container-sweet'>
                <div className='invitations-price-left'>
                    <div className='invitation-price-header'>Price Range Filter</div>
                    {
                        isMobile && <div onClick={() => setMenuOpen(!menuOpen)}>
                            <MenuIcon />
                        </div>
                    }
                    <div className={`invitation-toggle ${isMobile ? (menuOpen ? 'open' : 'close') : ''}`}>
                        {
                            sweetFilterData?.map((ele) => (
                                <div className='invitation-price' onClick={() => { handleFilter(ele) }}>{ele}</div>
                            ))
                        }
                    </div>
                </div>


                {isInvitationSweets ? (
                    <div className='sweets-content'>
                        <div className='sweets-content-list'>
                            {data?.length > 0 &&
                                data?.map((ele) => {
                                    let name = ele?.name[0]?.toUpperCase() + ele?.name.slice(1)?.toLowerCase();
                                    return (

                                        <div key={ele.id || ele.orderId} className='sweets-content-img' onClick={() => handleSweetForInvitation(ele)}>

                                            {orderId === ele?.orderId && (
                                                <div className='show-arrow-right'>
                                                    <img src={rightArrow} alt="Selected" />
                                                </div>
                                            )}
                                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                            <div className='sweets-name'>{name}</div>

                                            {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                                        </div>
                                    )
                                })}
                            {!data?.length > 0 && (
                                <div className='no-found'>No Data Found for Invitation Selection</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='sweets-content' >
                        <div className='sweets-content-list'>
                            {data?.length > 0 &&
                                <>
                                    {data?.map((ele) => {
                                        let name = ele?.name[0]?.toUpperCase() + ele?.name.slice(1)?.toLowerCase();
                                        return (
                                            <div key={ele.id || ele.name} className='sweets-main-container'>
                                                <div className='sweets-content-img' onClick={() => handleItemDetailNavigation(ele)}>
                                                    <div className='sweets-img-div'>
                                                        <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                                    </div>
                                                    <div className='sweets-name'>{name}</div>
                                                    {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>}
                        </div>
                        {!data?.length > 0 && (
                            <div className='no-found'>No Data Found</div>
                        )}
                    </div>
                )}
            </div>
            <AddSweets open={openModel} handleClose={handleClose} data={handleInvitationSweetDone} selectedSweet={invitationselectSweet} />
        </div>
    )
}