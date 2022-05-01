import Banner from "./components/Banner";
import { Carousels } from "./components/Carousels";
import { Footer } from "./components/Footer";
import {Services} from "./components/Services";
import { Amenities } from "./components/Amenities";
import { SmallBanner } from "./components/SmallBanner";
const HomeView = () => {
  return (
    <>
      <Banner />
      <Carousels />
      <Services/>
      <SmallBanner/>
      <Amenities/>
      <br/>
      <Footer />
    </>
  );
};
export default HomeView;
