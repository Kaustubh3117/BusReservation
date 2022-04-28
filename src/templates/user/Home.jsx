import Banner from "./assets/Banner";
import { Carousels } from "./assets/Carousels";
import { Footer } from "./assets/Footer";
import {Services} from "./assets/Services";
import { Amenities } from "./assets/Amenities";
import { SmallBanner } from "./assets/SmallBanner";
const Home = () => {
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
export default Home;
