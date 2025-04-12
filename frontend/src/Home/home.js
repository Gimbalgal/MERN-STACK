import React from "react";
import Flowerdetails from "./flowerDetail"; 
import Flowers from "./flower";
import Flowerform from "./flowerForm";



const Admin = () => {
    return (
        <div>
            <Flowers />
            <Flowerdetails />
            <Flowerform />
        </div>
    );
}
export default Admin;
