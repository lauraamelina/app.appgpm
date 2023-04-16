import React from "react";

export default function ImgProducts({id}) {
    return <img src={require(`../../../assets/img/icons/${id}.png`)} alt="img" />;
    
}

