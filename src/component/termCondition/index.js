import axios from "axios";
import { useEffect, useState } from "react";
import'./index.css';

export const TermCondition=()=>{
     const [htmlContent, setHtmlContent] = useState('');
    
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_BASE_URL}api/user/term-condition`)
                .then(response => {
                    setHtmlContent(response.data.termAndCondtionData[0]?.data);
                })
                .catch(error => {
                    console.error('Error fetching HTML:', error);
                });
        }, []);
    return (
         <div className="term-condition"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}