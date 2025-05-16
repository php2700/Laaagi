import { About } from "../about"
import { Ads } from "../ads"
import { Banner } from "../banner"
import { Best_seller } from "../Best_seller"
import { DiscoverCategory } from "../discover_category"
import { Dry_Fruit_Treat } from "../dry_fruit_treat"
import { Footer } from "../footer"
import { InvitationBox } from "../invitation_box"
import { Recent_view } from "../Recent_view"
import { Review } from "../review"
import { Shop } from "../shop"
import { WeddingSpecial } from "../wedding_special"
// import {guestList} from '../../utils/guestList'
// import GuestList from "../GuestList"

export const Dashboard = () => {
  return (
    <>
      <Banner />
      <WeddingSpecial />
      <Dry_Fruit_Treat />
      <Best_seller />

      {/* <Recent_view /> */}
      <DiscoverCategory />
      <InvitationBox />
      <Ads />
      <About />
      <Review />
      <Shop />
      {/* <GuestList/> */}
    </>
  )
}