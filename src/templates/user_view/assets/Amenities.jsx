import { RiBattery2ChargeLine, RiHammerFill, RiLightbulbFlashFill } from "react-icons/ri";
import { FaPhotoVideo, FaWifi } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import {HiLocationMarker} from 'react-icons/hi';
import {MdOutlineAir} from 'react-icons/md';

export const Amenities = () => {
  const data = [
    {
      title: "Charging Port",
      description: "aasdadasdasd asdasda dasd asdas",
      icon: "pi pi-shopping-cart",
      iconColor: "text-yellow-500",
      bgColor: "section_background",
      iconSize: "40px",
    },
    {
      title: "Hammer",
      description:
        "asdas asdasdasd asdasdasd asdsadasdasdasdasd  asdassdas a asdasdasdsa",
      icon: "pi pi-shopping-cart",
      iconColor: "text-blue-500",
      bgColor: "section_background",
      iconSize: "40px",
    },
    {
      title: "Entertainment",
      description: "asdsadasdasad",
      icon: "pi pi-shopping-cart",
      iconColor: "text-indigo-500",
      bgColor: "section_background",
      iconSize: "40px",
    },
    {
      title: "Fire Extinguisher",
      description: "asdasdasdasdasdsadsdas asdasd asdasd asdasdas",
      icon: "pi pi-shopping-cart",
      iconColor: "text-pink-500",
      bgColor: "section_background",
      iconSize: "40px",
    },
  ];

  const data1 = [
    {
      title: "Free Pickup",
      description: "aasdadasdasd asdasda dasd asdas",
      icon: "pi pi-shopping-cart",
      iconColor: "text-blue-400",
      bgColor: "section_background",
      iconSize: "40px",
    },
    {
      title: "Air Conditioner",
      description:
        "asdas asdasdasd asdasdasd asdsadasdasdasdasd  asdassdas a asdasdasdsa",
      iconColor: "text-orange-400",
      bgColor: "section_background",
      iconSize: "40px",
    },
    {
      title: "Reading Light",
      description: "asdsadasdasad",
      iconColor: "text-cyan-500",
      bgColor: "section_background",
      iconSize: "40px",
    },
    {
      title: "Wifi",
      description: "asdasdasdasdasdsadsdas asdasd asdasd asdasdas",
      iconColor: "text-blue-500",
      bgColor: "section_background",
      iconSize: "40px",
    },
  ];

  return (
    <div className="px-4 py-5 md:px-6 lg:px-8">
      <div className="mb-3  text-center">
        <span className="text-6xl font-bold text-2xl">Amenities</span>
        {/* <span className="text-indigo-500 text-6xl">Amenities we provide</span> */}
        <div className="text-xl mb-6">
          Amenities Provide by us.
        </div>
      </div>

      <div className="grid">
        {data.map((ele) => {
          return (
            <div className="sm:col-6 lg:col-3 mt-3 md:col-6 amenities">
              <div className={`${ele.bgColor} shadow-2 p-3 border-round`}>
                <div className="flex justify-content-between mb-3">
                <div className="grid">
                    <div className="col-6 flex align-items-center justify-content-center">
                      {ele.title === "Charging Port" ? (
                        <RiBattery2ChargeLine
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.title === "Hammer" ? (
                        <RiHammerFill
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.title === "Entertainment" ? (
                        <FaPhotoVideo
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.title === "Fire Extinguisher" ? (
                        <AiOutlineFire
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.icon === "money" ? (
                        <RiBattery2ChargeLine
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.icon === "bus" ? (
                        <RiBattery2ChargeLine
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : null}
                    </div>
                    <div className="col-6 flex align-items-center justify-content-center">
                      <span className="block text-500 font-bold m-b-3">
                        {ele.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid">
        {data1.map((ele) => {
          return (
            <div className="sm:col-6 lg:col-3 mt-3 md:col-6 amenities">
              <div className={`${ele.bgColor} shadow-2 p-3 border-round`}>
                <div className="flex justify-content-between mb-3">
                  <div className="grid">
                    <div className="col-6 flex align-items-center justify-content-center">
                      {ele.title === "Free Pickup" ? (
                        <HiLocationMarker
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.title === "Air Conditioner" ? (
                        <MdOutlineAir
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.title === "Reading Light" ? (
                        <RiLightbulbFlashFill
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : ele.title === "Wifi" ? (
                        <FaWifi
                          fontSize={ele.iconSize}
                          className={ele.iconColor}
                        />
                      ) : null}
                    </div>
                    <div className="col-6 flex align-items-center justify-content-center">
                      <span className="block text-500 font-bold m-b-3">
                        {ele.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
