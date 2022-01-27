import React from "react";
import preloader from "../../../Images/Fidget-spinner.gif";

export const Preloader = (props: any) => {
    return (
        <div style={{backgroundColor: "white"}}>
            <img src={preloader}/>
        </div>
    )
}