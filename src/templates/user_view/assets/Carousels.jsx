import { Carousel } from "primereact/carousel";

const template = (product) => {
  return (
    <div className="product-item text flex justify-content-center">
      <div className="product-item-content">
        <div className="mb-3">
          <img
            src={`images/product/${product.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={product.name}
            className="product-image"
          />
        </div>
        <div>
          <h4 className="mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
          <span
            className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}
          >
            {product.inventoryStatus}
          </span>
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
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1003",
      code: "244wgerg2",
      name: "Blue T-Shirt",
      description: "Product Description",
      image: "blue-t-shirt.jpg",
      price: 29,
      category: "Clothing",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1004",
      code: "h456wer53",
      name: "Bracelet",
      description: "Product Description",
      image: "bracelet.jpg",
      price: 15,
      category: "Accessories",
      quantity: 73,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1005",
      code: "av2231fwg",
      name: "Brown Purse",
      description: "Product Description",
      image: "brown-purse.jpg",
      price: 120,
      category: "Accessories",
      quantity: 0,
      inventoryStatus: "OUTOFSTOCK",
      rating: 4,
    },
  ];
  return (
    <div className="bg-cyan-50 mt-5 text-center">
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
