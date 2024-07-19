const FooterPage = () => {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-6">
                <a href="#">
                  <h1 className="text-primary mb-0">News App</h1>
                  <p className="text-secondary mb-0">Lastest Headlines</p>
                </a>
              </div>

              <div className="col-lg-6">
                <div className="d-flex justify-content-end pt-3">
                  <a
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-twitter" />
                  </a>

                  <a
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5"></div>
        </div>
      </div>
      {/* Footer End */}
      {/* Copyright Start */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light">
                <a href="#">
                  <i className="fas fa-copyright text-light me-2" />
                  News App
                </a>
                , All right reserved.
              </span>
            </div>
            <div className="col-md-6 my-auto text-center text-md-end text-white">
              Designed By{" "}
              <a className="border-bottom" href="#">
                ACS
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}
      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
      >
        <i className="fa fa-arrow-up" />
      </a>
      {/* JavaScript Libraries */}
      {/* Template Javascript */}
    </>
  );
};
export default FooterPage;
