import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './component/dashboard';
import { Invitation } from './component/invitations';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { Misc } from './component/invitations/misc';
import { Invitation_Box } from './component/invitations/invitation_box';
import { Wooden } from './component/invitations/wooden';
import { Glass } from './component/invitations/glass';
import { Sweets } from './component/sweets';
import { Bengali_Sweets } from './component/sweets/bengali_sweets';
import { Decorations } from './component/decorations';
import { BirthDay } from './component/decorations/birthday';
import { Mehndi } from './component/decorations/mehndi';
import { Room_Decor } from './component/decorations/room';
import { Party } from './component/decorations/party';
import { Designers } from './component/designers';
import { Groom } from './component/designers/groom';
import { Suits } from './component/designers/suits';
import { Other } from './component/designers/other';
import { ContactUs } from './component/contactUs';
import { PlanningTool } from './component/planning_tool';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PlanningBirthDay } from './component/planning_tool/birthday';
import { PlanningMehndi } from './component/planning_tool/mehndi';
import { PlanningParty } from './component/planning_tool/party';
import { PlanningRoomDecor } from './component/planning_tool/room_decor';
import { SweetsInfo } from './component/sweets/info';
import { SignUp } from './component/signUp';
import { useContext } from 'react';
import { AuthContext } from './component/context';
import { GuestList } from './component/invitations/GuestList';
import { Invitationhome } from './component/invitations/Invitationhome';
import { ProfilePage } from './component/header/ProfilePage';
import { Edit_Guest } from './component/invitations/edit_guest';
import { Add_Guest } from './component/invitations/add_guest';
import { Guest } from './component/invitations/guest';
import { Payment } from './component/payment';
import { LastUrl } from './lastUrl';
import { UploadDesign } from './component/invitations/UploadDesign';
import { Add_Address_Person } from './component/invitations/address-person';
import { PaymentHistory } from './component/invitations/payment-history';
import { DryFruitInfo } from './component/sweets/dry_fruit_info';
import { Dry_fruit } from './component/sweets/dry_fruit';
import { ViewHistory } from './component/invitations/viewHistory';
import { ViewSweetHistory } from './component/sweets/sweet-history';
import { BestSeller } from './component/Best_seller/list';
import { PrivacyPolicy } from './component/privacy-policy';
import { DemoVideo } from './component/demo';
import { LoginDemoVideo } from './component/demo/login-demo';
import { Cart } from './component/cart';
import { CartHome } from './component/invitations/cart.detail';
import { Shipping } from './component/shipping';
import { Refund } from './component/refund';
import { SavedCart } from './component/cart/saved';
import { TermCondition } from './component/termCondition';
import { useOnlineStatus } from './component/context/custom';
import { Offline } from './component/offline';


function App() {
  const isOnline = useOnlineStatus();

  /*------------------------- this is the private route -------------------*/
  const PrivateRoute = ({ children }) => {
    const content = useContext(AuthContext)
    const token = content?.token || localStorage.getItem('token')
    return (
      <>{token ? children : < Navigate to='/' />}</>
    )
  }

  console.log("ggggg")
  return (
    <>
      {!isOnline && <Offline />}
      <div className='app-container'>
        {/* <BrowserRouter> */}
        <LastUrl />
        <Header />
        <DemoVideo />
        <div className='app-content'>
          <Routes>
            <Route index path='/' element={<Dashboard />} />
            <Route path='/invitation' element={< Invitation />} />
            <Route path='/invitation-wooden' element={<Wooden />} />
            <Route path='/invitation-box' element={<Invitation_Box />} />
            <Route path='/invitation-glass' element={<Glass />} />
            <Route path='/invitation-misc' element={<Misc />} />
            <Route path='/sweets' element={<Sweets />} />
            <Route path='/bengali-sweets' element={<Bengali_Sweets />} />
            <Route path='/decorations' element={<Decorations />} />
            <Route path='/bithday' element={<BirthDay />} />
            <Route path='/mehndi' element={<Mehndi />} />
            <Route path='/room-decor' element={<Room_Decor />} />
            <Route path='/party' element={<Party />} />
            <Route path='/designers' element={<Designers />} />
            <Route path='/groom' element={<Groom />} />
            <Route path='/suits' element={<Suits />} />
            <Route path='/other' element={<Other />} />
            <Route path='/contact-us' element={<ContactUs />} />
            {/* <Route path='/upload-design' element={<UploadInvitation />} /> */}
            {/* <Route path='/planning-tool' element={<PrivateRoute>< PlanningTool /></PrivateRoute>} /> */}
            <Route path='/planning-tool' element={< PlanningTool />} />

            <Route path='/planning-birthday' element={<PlanningBirthDay />} />
            <Route path='/planning-mehndi' element={<PlanningMehndi />} />
            <Route path='/planning-party' element={<PlanningParty />} />
            <Route path='/planning-other' element={<PlanningRoomDecor />} />
            <Route path='/sweets-info/:_id/:url' element={<SweetsInfo />} />
            <Route path='/dry_fruit_list' element={<Dry_fruit />} />
            {/* <Route path='/dry-fruit_info/:_id/:url' element={<DryFruitInfo />} /> */}
            {/* <Route path='/sweets-info/' element={<SweetsInfo />} /> */}

            <Route path='/signup' element={<SignUp />} />
            {/* <Route path="/invitation-detail" element={<Invitationhome />} /> */}
            <Route path="/invitation-detail/:_id/:url" element={<Invitationhome />} />
            <Route path='best-seller' element={<BestSeller />} />


            <Route path='/invitation-GuestList/:total' element={<PrivateRoute><GuestList /></PrivateRoute>} />
            <Route path='/guest/:name' element={<PrivateRoute><Guest /></PrivateRoute>} />
            <Route path='/guest-add' element={<PrivateRoute><Add_Guest /></PrivateRoute>} />
            <Route path='/edit-guest' element={<PrivateRoute><Edit_Guest /></PrivateRoute>} />

            <Route path='/payment' element={<PrivateRoute><Payment /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path='/Design' element={<PrivateRoute><UploadDesign /></PrivateRoute>} />

            {/* update address by person */}
            <Route path='/update-address-person' element={<Add_Address_Person />} />

            {/* payment history */}
            <Route path='/payment-history' element={<PrivateRoute><PaymentHistory /></PrivateRoute>} />
            <Route path='/view-history/:_id' element={<PrivateRoute><ViewHistory /></PrivateRoute>} />
            <Route path='/view-sweet-history/:_id' element={<PrivateRoute><ViewSweetHistory /></PrivateRoute>} />
            <Route path='/dry-fruit_info/:_id' element={<DryFruitInfo />} />
            <Route path='/sample-demo' element={<PrivateRoute><LoginDemoVideo /></PrivateRoute>} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />

            <Route path='/cart-list' element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path='/saved-cart-list' element={<PrivateRoute><SavedCart /></PrivateRoute>} />
            <Route path='/cart-detail/:_id/:status' element={<PrivateRoute><CartHome /></PrivateRoute>} />
            <Route path='/Shipping' element={<PrivateRoute><Shipping /></PrivateRoute>} />
            <Route path='/payment-refund' element={<PrivateRoute><Refund /></PrivateRoute>} />
            <Route path='/term-condition' element={<TermCondition />} />

          </Routes>
        </div>
        <Footer />
        {/* </BrowserRouter> */}
        <ToastContainer />
      </div >
    </>
  );
}

export default App;
