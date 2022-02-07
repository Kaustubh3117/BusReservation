import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const PageNotFound = () => {
  return (
    <div className="text-center mt-8">
      <div className="grid">
        <div className="col-4"></div>
        <div className="col-4">
          <Card className="shadow-4">
            <span className="text-8xl">404</span>
            <div id="info">
              <h3>This page could not be found</h3>
              <Button label="Go Back Home" icon="pi pi-arrow-circle-left" />
            </div>
          </Card>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default PageNotFound;
