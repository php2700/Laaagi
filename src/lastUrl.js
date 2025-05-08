import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function LastUrl() {
    const location = useLocation();

    useEffect(() => {
        const currentURL = sessionStorage.getItem('currentURL');
        const lastURL = sessionStorage.getItem('lastURL');

        if (lastURL) {
            sessionStorage.setItem('secondLastUrl', lastURL);
        }

        if (currentURL) {
            sessionStorage.setItem('lastURL', currentURL);
        }
        console.log(currentURL, "lastUrl", lastURL, "secondlastURL")
        sessionStorage.setItem('currentURL', location?.pathname);
    }, [location]);
}
