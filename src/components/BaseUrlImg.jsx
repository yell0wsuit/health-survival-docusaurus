import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const BaseUrlImg = ({ src, alt, ...props }) => (
    <a href="#" className="imgpop" data-bs-toggle="modal" data-bs-target="#imagemodal">
        <img src={useBaseUrl(src)} className="img-fluid w-50 mx-auto d-block mb-4" alt={alt} {...props} loading="lazy" decoding="async" />
    </a>
);

export default BaseUrlImg;
