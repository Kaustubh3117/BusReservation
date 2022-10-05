import { Carousel } from "primereact/carousel";
import cr1 from '../../../img/carousal/carousal1.jpg'
import cr2 from '../../../img/carousal/carousal2.jpg'
import cr3 from '../../../img/carousal/carousal3.jpg'
import cr4 from '../../../img/carousal/carousal4.jpg'
import cr5 from '../../../img/carousal/carousal5.jpg'

const template = (product) => {
  return (
    <div className="product-item text flex justify-content-center">
      <div className="product-item-content">
        <div className="mb-3">
          <img
            src={product.image}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={product.name}
            className="product-image"
            width='240px'
          />
        </div>
        <div>
          <h4 className="mb-1">{product.name}</h4>
        </div>
      </div>
    </div>
  );
};

export const Carousels = () => {
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "600px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const data = [
    {
      id: "1000",
      name: "Bandra-Worli Sea link",
      image: cr1,
     
    },
    {
      id: "1001",
      name: "Gate Way of India",
      image: cr2,
    },
    {
      id: "1002",
      name: "Beach",
      image: cr3,
    },
    {
      id: "1003",
      name: "Marine Drive",
      image: cr4,
    },
    {
      id: "1004",
      name: "SiddhiVinayak Temple",
      image: cr5,
    },
    {
      id: "1005",
      name: "Bandra-Worli Sea link",
      image: cr1,
    },
  ];
  return (
    <div className="section_background text-center">
      <div className="">
        <div className="mb-3">
          <span className="md:text-6xl sm:text-6xl lg:text-6xl font-bold">
            Gallery
          </span>
        </div>
        <div className="text-xl mb-6">
         Some of the places from Mumbai.
        </div>
        <Carousel
          value={data}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={template}
        />
      </div>
    </div>
  );
};
