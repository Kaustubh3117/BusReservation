import Banner from "./Banner";
import { Carousels } from "./assets/Carousels";
import { Footer } from "./assets/Footer";
import {Services} from "./assets/Services";
import { Amenities } from "./assets/Amenities";
const Home = () => {
  return (
    <>
      <Banner />
      <Carousels />
      <Services/>
      <Amenities/>
      <br/>
      <Footer />
    </>
  );
};
export default Home;
