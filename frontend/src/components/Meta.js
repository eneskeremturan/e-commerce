import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "E-ticaret'e Hoşgeldiniz",
  keywords: "Saat, Saat Satın Al",
  description: "En Kaliteli Saatler",
};

export default Meta;
