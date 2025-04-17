import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { GuestList } from './component/invitations/GuestList';
import { Invitationhome } from './component/invitations/Invitationhome';
// import {GuestRow} from './component/invitations/GuestRow';

function App() {
  return (
    <>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        {/* <div> */}
        <BrowserRouter>
          <Header />
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
            {/* <Route path='/invitation-GuestList' element={<GuestList />} /> */}
            <Route path="/invitation" element={<Invitation />} />
            <Route path="/invitation/:id" element={<Invitationhome />} />
            

          </Routes>
        </BrowserRouter>
        <Footer />
      </div >
    </>
  );
}

export default App;
