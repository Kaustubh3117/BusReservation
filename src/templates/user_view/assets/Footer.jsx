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
    <div className="bg-primary text-center text-lg-start text-muted">
      {/* <section className="flex justify-content-center lg:justify-content-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#" className="">
            <i className="pi pi-google" style={{ fontSize: "30px" }}></i>
          </a>
          <a href="#" className="">
            <i className="pi pi-facebook" style={{ fontSize: "30px" }}></i>
          </a>
          <a href="#" className="">
            <i className="pi pi-instagram" style={{ fontSize: "30px" }}></i>
          </a>
        </div>
      </section> */}

      <section className="">
        <div className="text-center text-md-start mt-5">
          <div className="grid mt-3">
            <div className="sm:col-3 lg:col-4 mx-auto mb-4">
              <h6 className="text-3xl font-bold  mb-4">Giyobus</h6>
              <p>
                Giyobus provide userfriendly UI which enables you to book
                tickets with ease. You can pay online with various payment
                methods.
              </p>
            </div>

            <div className="sm:col-2 lg:col-2 md:col-2 mx-auto mb-4">
              <h6 className="text-uppercase text-3xl mb-4">Buses</h6>
              <p className="footertext">Mumbai</p>
              <p>Pune</p>
              <p>Kolhapur</p>
              {/* <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p> */}
            </div>

            <div className="sm:col-2 lg:col-2 md:col-3 mx-auto mb-4">
              <h6 className="font-bold text-3xl mb-4">Useful links</h6>
              <p className="footertext">
                <a href="#!" className="text-0">
                  Home
                </a>
              </p>
              <p>
                <a href="#!" className="text-0">
                  Login
                </a>
              </p>
              <p>
                <a href="#!" className="text-0">
                  Signup
                </a>
              </p>
              <p>
                <a href="#!" className="text-0">
                  Print ticket
                </a>
              </p>
            </div>

            <div className="sm:col-3 lg:col-3 md:col-4 mx-auto mb-md-0 mb-4">
              <h6 className="font-bold text-3xl mb-4">Contact</h6>
              <p>
                <i className="pi pi-home" style={{ fontSize: "20px" }}></i>
                <span className="ml-2">Mumbai</span>
              </p>
              <p>
                <i className="pi pi-envelope" style={{ fontSize: "20px" }}></i>{" "}
                <span className="ml-2"> ganeshay8@gmail.com</span>
              </p>
              <p>
                <i className="pi pi-phone" style={{ fontSize: "20px" }}></i>{" "}
                <span className="ml-2"> + 91 99 75 05 5807</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
