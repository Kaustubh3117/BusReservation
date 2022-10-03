import { FaTicketAlt, FaHeadphones, FaBus } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { Card } from 'primereact/card';

export const Services = () => {
  const gridData1 = [
    {
      title: "Online Ticket",
      description: "You can book ticket online from anywhere.",
      icon: "ticket",
      iconSize: "80px",
      iconColor: "text-pink-600",
    },
    {
      title: "Online Payment",
      description: "You can pay online. Paying with giyobus is super easy.",
      icon: "payment",
      iconSize: "80px",
      iconColor: "text-blue-500",
    },
    {
      title: "Customer Support",
      description: "we provide you customer support.",
      icon: "customer",
      iconSize: "80px",
      iconColor: "text-purple-500",
    },
  ];

  const gridData2 = [
    {
      title: "Refund",
      description: "Refund available if anything goes wrong.",
      icon: "refund",
      iconSize: "80px",
      iconColor: "text-yellow-600",
    },
    {
      title: "Low Rates",
      description: "Online Bus Ticket Booking at Lowest Price",
      icon: "money",
      iconSize: "80px",
      iconColor: "text-teal-600",
    },
    {
      title: "Asured travel",
      description:
        "Insure journey with Giyobus. We provide bus cancellation and refunds.",
      icon: "bus",
      iconSize: "80px",
      iconColor: "text-orange-500",
    },
  ];

  const getCards = (ele) => {
    return (
      <>
        <Card className="sm:col-6 shadow-4 lg:col-3 md:col-4 mb-4 px-5 ml-3 mr-3 serviceCard">
          <span
            className="p-3 mb-3 inline-block"
            style={{ borderRadius: "10px" }}
          >
            <i className={`${ele.icon} text-4xl ${ele.iconColor}`}></i>
            {ele.icon === "ticket" ? (
              <FaTicketAlt fontSize={ele.iconSize} className={ele.iconColor} />
            ) : ele.icon === "payment" ? (
              <AiFillCreditCard fontSize={ele.iconSize} className={ele.iconColor} />
            ) : ele.icon === "customer" ? (
              <FaHeadphones fontSize={ele.iconSize} className={ele.iconColor} />
            ) : ele.icon === "refund" ? (
              <GiReceiveMoney fontSize={ele.iconSize} className={ele.iconColor} />
            ) : ele.icon === "money" ? (
              <GiTakeMyMoney fontSize={ele.iconSize} className={ele.iconColor} />
            ) : ele.icon === "bus" ? (
              <FaBus fontSize={ele.iconSize} className={ele.iconColor} />
            ) : null}
          </span>
          <div className="text-xl mb-3 font-medium">{ele.title}</div>
          <span className="text-lg text-sm line-height-3">
            {ele.description}
          </span>
        </Card>
      </>
    );
  };

  return (
    <div className="surface-0 text-center mt-3">
      <div className="mb-3 font-bold text-2xl">
        <span className="md:text-6xl sm:text-6xl lg:text-6xl font-bold">
          Why Booking with Giyobus{" "}
        </span>
        {/* <span className="text-indigo-500 lg:text-6xl sm:text-4xl font-bold"></span> */}
      </div>
      <div className="text-xl mb-6">
        Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
      </div>
      <div className="grid flex justify-content-center">
        {gridData1.map((ele) => {
          return <>{getCards(ele)}</>;
        })}
      </div>
      <div className="grid flex justify-content-center">
        {gridData2.map((ele) => {
          return <>{getCards(ele)}</>;
        })}
      </div>
    </div>
  );
};
