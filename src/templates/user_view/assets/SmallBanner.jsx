import { Button } from "primereact/button";
import { Card } from "primereact/card";
export const SmallBanner = () => {
  return (
    <Card className="shadow-4 mb-4">
      <div className="surface-0 text-700 text-center mt-3 mb-3">
        <div className="text-blue-600 font-bold mb-3">
          <i className="pi pi-discord"></i>&nbsp;POWERED BY DISCORD
        </div>
        <div className="sm:text-900 font-bold sm:text-4xl md:text-5xl lg:text-6xl mb-3">
          Join Our Design Community
        </div>
        <div className="text-700 text-2xl mb-5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
          numquam eligendi quos.
        </div>
        <Button
          label="Join Now"
          icon="pi pi-discord"
          className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
        />
      </div>
    </Card>
  );
};
