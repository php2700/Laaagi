import { useEffect, useState } from "react";
import './index.css'
import axios from "axios";

export const Shipping=()=>{
      const [htmlContent, setHtmlContent] = useState('');
    
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_BASE_URL}api/user/shipping`)
                .then(response => {
                    setHtmlContent(response.data.shippingData[0]?.data);
                })
                .catch(error => {
                    console.error('Error fetching HTML:', error);
                });
        }, []);
    return (
         <div className="shipping-view"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}