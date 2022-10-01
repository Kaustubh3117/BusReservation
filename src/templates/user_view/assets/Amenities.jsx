export const Amenities = () => {
  const data = [
    {
      title: "Orders",
      description: "aasdadasdasd asdasda dasd asdas",
      icon: "pi pi-shopping-cart",
      iconColor: "text-blue-500",
    },
    {
      title: "Revenue",
      description:
        "asdas asdasdasd asdasdasd asdsadasdasdasdasd  asdassdas a asdasdasdsa",
      icon: "pi pi-shopping-cart",
      iconColor: "text-blue-500",
    },
    {
      title: "Revenue",
      description: "asdsadasdasad",
      icon: "pi pi-shopping-cart",
      iconColor: "text-indigo-500",
    },
    {
      title: "Revenue",
      description: "asdasdasdasdasdsadsdas asdasd asdasd asdasdas",
      icon: "pi pi-shopping-cart",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
      <div className="mb-3  text-center">
        <span className="text-6xl font-bold text-2xl">Amenities</span>
        {/* <span className="text-indigo-500 text-6xl">Amenities we provide</span> */}
        <div className="text-xl mb-6">
          Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
        </div>
      </div>
     
      <div className="grid">
        {data.map((ele) => {
          return (
            <div className="sm:col-6 lg:col-3 mt-3 md:col-6 amenities">
              <div className="surface-card shadow-2 p-3 border-round">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium m-b-3">
                      {ele.title}
                    </span>
                    {/* <div className="text-900 font-medium text-xl">152</div> */}
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className={`${ele.icon} ${ele.iconColor} text-xl`}></i>
                  </div>
                </div>
                {/* <span className="text-green-500 font-medium">24 new </span> */}
                <span className="text-500">{ele.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
