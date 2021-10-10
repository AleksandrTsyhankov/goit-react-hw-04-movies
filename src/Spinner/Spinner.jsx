import React from 'react';
import Loader from "react-loader-spinner";

export default function Spinner() {

    return (
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
        padding-top={0}
        margin-top={0}
        // textAlign="center"
      />
    );
}