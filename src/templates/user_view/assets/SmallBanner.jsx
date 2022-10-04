import { Image } from "primereact/image";
import offer from "../../../img/offer.png";

export const SmallBanner = () => {
  return (
    <div className="mb-4 flex justify-content-center shadow-4 small_banner section_background">
      <div className="grid mt-4 mb-4">
        <div className="sm:col-6 lg:col-4 md:col-6">
          <Image
            src={offer}
            template="Preview Content"
            alt="Image Text"
            width="300"
            className="small_banner_image"
          />
        </div>
        <div className="sm:col-6 lg:col-4 md:col-6">
          <Image
            src={offer}
            template="Preview Content"
            alt="Image Text"
            width="300"
            className="small_banner_image"
          />
        </div>
        <div className="sm:col-6 lg:col-4 md:col-6">
          <Image
            src={offer}
            template="Preview Content"
            alt="Image Text"
            width="300"
            className="small_banner_image"
          />
        </div>
      </div>
    </div>
  );
};
