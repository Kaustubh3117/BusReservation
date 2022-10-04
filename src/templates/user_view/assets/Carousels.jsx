import { Carousel } from "primereact/carousel";
import carousal from '../../../img/carousal.jpg'
import cr1 from '../../../img/carousal1.jpg'
import cr2 from '../../../img/carousal2.jpg'
import cr3 from '../../../img/carousal3.jpg'

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
          {/* <span
            className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}
          > */}
            {/* {product.inventoryStatus}
          </span> */}
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
      name: "Bamboo Watch",
      image: cr1,
     
    },
    {
      id: "1001",
      name: "Black Watch",
      image: cr2,
    },
    {
      id: "1002",
      name: "Blue Band",
      description: "Product Description",
      image: cr3,
    },
    {
      id: "1003",
      name: "Blue T-Shirt",
      image: cr1,
    },
    {
      id: "1004",
      code: "h456wer53",
      image: cr2,
    },
    {
      id: "1005",
      code: "av2231fwg",
      image: cr3,
    },
  ];
  return (
    <div className="section_background text-center">
      <div className="">
        <div className="mb-3">
          <span className="md:text-6xl sm:text-6xl lg:text-6xl font-bold">
            Gallery
          </span>
          {/* <span className="text-indigo-500 lg:text-6xl sm:text-4xl font-bold"></span> */}
        </div>
        <div className="text-xl mb-6">
          Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
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
