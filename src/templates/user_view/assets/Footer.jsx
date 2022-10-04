export const Footer = () => {
  const data = [
    {},
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
    <div className="grid bg-primary py-3 mt-4">
     
        {/* {data.map((ele) => {
          return(
            <>
            <br/>  */}
            <div className="lg:col-4">
              {/* <div className="text-xl font-medium">{ele.title}</div>
              <div>{ele.subTitle1}</div>
              <div>{ele.subTitle2}</div>
              <div>{ele.subTitle3}</div> */}
              <div className="text-xl font-medium">tile</div>
              <div>subtitle</div>
              <div>subtitle</div>
              <div>subtitle</div>
            </div>
            <div className="lg:col-4">
              {/* <div className="text-xl font-medium">{ele.title}</div>
              <div>{ele.subTitle1}</div>
              <div>{ele.subTitle2}</div>
              <div>{ele.subTitle3}</div> */}
              <div className="text-xl font-medium">tile</div>
              <div>subtitle</div>
              <div>subtitle</div>
              <div>subtitle</div>
            </div>
            <div className="lg:col-4">
              {/* <div className="text-xl font-medium">{ele.title}</div>
              <div>{ele.subTitle1}</div>
              <div>{ele.subTitle2}</div>
              <div>{ele.subTitle3}</div> */}
              <div className="text-xl font-medium">tile</div>
              <div>subtitle</div>
              <div>subtitle</div>
              <div>subtitle</div>
            </div>
            {/* </>
          )
        })} */}
    </div>
  );
};
