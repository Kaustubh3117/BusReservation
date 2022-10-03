export const Footer = () => {
  const data = [
    {
      title: "About Giyobus",
      subTitle1: "From : Karad",
      subTitle2: "From : Karad",
      subTitle3: "From : Karad",
    },
    {
      title: "About Giyobus",
      subTitle1: "From : Karad",
      subTitle2: "From : Karad",
      subTitle3: "From : Karad",
    },
    {
      title: "About Giyobus",
      subTitle1: "From : Karad",
      subTitle2: "From : Karad",
      subTitle3: "From : Karad",
    },
    {
      title: "About Giyobus",
      subTitle1: "From : Karad",
      subTitle2: "From : Karad",
      subTitle3: "From : Karad",
    },
  ];
  return (
    <div className="grid flex align-items-between justify-content-between bg-primary py-3">
        {data.map((ele) => {
          return(
            <div className="sm:col-12 md:col-12 lg:col-3">
              <div className="text-xl font-medium">{ele.title}</div>
              <div>{ele.subTitle1}</div>
              <div>{ele.subTitle2}</div>
              <div>{ele.subTitle3}</div>
            </div>
          )
        })}
    </div>
  );
};
