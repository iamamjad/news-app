import React from "react";
const Links = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>News app</title>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="" name="keywords" />
      <meta content="" name="description" />
      {/* Google Web Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
        rel="stylesheet"
      />
      {/* Icon Font Stylesheet */}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      {/* Libraries Stylesheet */}
      <link
        href="../assets/lib/lightbox/css/lightbox.min.css"
        rel="stylesheet"
      />

      {/* Customized Bootstrap Stylesheet */}
      <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
      {/* Template Stylesheet */}
      <link href="../assets/css/style.css" rel="stylesheet" />
    </>
  );
};

export default Links;
