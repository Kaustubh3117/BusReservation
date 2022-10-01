export const Services = () => {
  const gridData1 = [
    {
      title: "Built for Developers",
      description:
        " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      icon: "pi pi-desktop",
      iconColor: "text-blue-500",
    },
    {
      title: "Built for Developers",
      description:
        " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      icon: "pi pi-lock",
      iconColor: "text-blue-500",
    },
    {
      title: "Built for Developers",
      description:
        " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      icon: "pi pi-desktop",
      iconColor: "text-blue-500",
    }
  ];

  const gridData2 = [
    {
      title: "Built for Developers",
      description:
        " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      icon: "pi pi-desktop",
      iconColor: "text-blue-500",
    },
    {
      title: "Built for Developers",
      description:
        " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      icon: "pi pi-desktop",
      iconColor: "text-blue-500",
    },
    {
      title: "Built for Developers",
      description:
        " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      icon: "pi pi-desktop",
      iconColor: "text-blue-500",
    },
  ]

  const getCards = (ele) => {
    return (
      <>
        <div className="sm:col-6 lg:col-4 md:col-4 mb-4 px-5">
          <span
            className="p-3 shadow-2 mb-3 inline-block"
            style={{ borderRadius: "10px" }}
          >
            <i className={`${ele.icon} text-4xl ${ele.iconColor}`}></i>
          </span>
          <div className="text-xl mb-3 font-medium">{ele.title}</div>
          <span className="text-lg text-sm line-height-3">
           {ele.description}
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="surface-0 text-center mt-3">
      <div className="mb-3 font-bold text-2xl">
        <span className="md:text-6xl sm:text-6xl lg:text-6xl font-bold">Why Booking with Giyobus </span>
        {/* <span className="text-indigo-500 lg:text-6xl sm:text-4xl font-bold"></span> */}
      </div>
      <div className="text-xl mb-6">
        Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
      </div>
      <div className="grid">
        {gridData1.map((ele) => {
          return <>{getCards(ele)}</>;
        })}
      </div>
      <div className="grid">
        {gridData2.map((ele) => {
          return <>{getCards(ele)}</>;
        })}
      </div>
    </div>
  );
};
