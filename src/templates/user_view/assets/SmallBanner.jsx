import { Button } from "primereact/button";
import { Card } from "primereact/card";
export const SmallBanner = () => {
  return (
    <Card className="mb-4">
      <div className="text-700 text-center mt-3 mb-3">
        {/* <div className="text-blue-600 font-bold mb-3">
         Contact Us
        </div> */}
        <div className="sm:text-900 font-bold sm:text-4xl md:text-5xl lg:text-6xl mb-3">
        Contact Us
        </div>
      
        <div className="text-xl mb-6">
        If you have any Queries. Feel free to ask.
        </div>
       
        <Button
          label="Join Now"
          className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap bg-pink-400 border-pink-400"
        />
      </div>
    </Card>
  );
};
