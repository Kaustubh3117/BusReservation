import { Image } from "primereact/image";
import offer from "../../../img/offer/offer.png";
import offer2 from "../../../img/offer/offer2.png";
import offer3 from "../../../img/offer/offer3.png";

export const SmallBanner = () => {
  const data = [offer, offer2, offer3];
  return (
    <div className="mb-4 flex justify-content-center shadow-4 small_banner section_background">
      <div className="grid mt-4 mb-4">
        {data.map((ele) => {
          return (
            <>
              <div className="sm:col-6 lg:col-4 md:col-6">
                <Image
                  src={ele}
                  template="Preview Content"
                  alt="Image Text"
                  width="300"
                  className="small_banner_image"
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
