import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const BaseUrlImg = ({ src, alt, ...props }) => (
    <a href="#" className="imgpop" data-bs-toggle="modal" data-bs-target="#imagemodal">
        <img src={useBaseUrl(src)} className="figure-img img-fluid w-50 mx-auto d-block" alt={alt} {...props} loading="lazy" decoding="async" />
    </a>
);

export default BaseUrlImg;
