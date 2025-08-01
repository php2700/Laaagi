import axios from "axios";
import { useEffect, useState } from "react";
import './index.css'

export const Refund=()=>{
    const [htmlContent, setHtmlContent] = useState('');
    
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_BASE_URL}api/user/payment-refund`)
                .then(response => {
                    setHtmlContent(response.data.paymentRefundData[0]?.data);
                })
                .catch(error => {
                    console.error('Error fetching HTML:', error);
                });
        }, []);
    return (
  <div className="refund"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}