import Banner from "./assets/Banner";
import { Carousels } from "./assets/Carousels";
import { Footer } from "./assets/Footer";
import { Services } from "./assets/Services";
import { Amenities } from "./assets/Amenities";
import { SmallBanner } from "./assets/SmallBanner";
import { InfoSection } from "./assets/InfoSection";
import { SmallFooter } from "./assets/SmallFooter";

const UserView = () => {
  return (
    <>
      <Banner />
      <SmallBanner />
      <Services />
      <Carousels />
      <Amenities />
      <InfoSection />
      {/* <SmallFooter /> */}
      <Footer />
      <SmallFooter />
    </>
  );
};
export default UserView;
