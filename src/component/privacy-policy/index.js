import axios from "axios";
import { useEffect, useState } from "react";

export const PrivacyPolicy = () => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/privacy-policy`)
            .then(response => {
                setHtmlContent(response.data.privacyPolicyData[0]?.data);
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }, []);
    return (
        <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}