import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function LastUrl() {
    const location = useLocation();

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [location]);



    useEffect(() => {
        const currentURL = localStorage.getItem('currentURL');
        const lastURL = localStorage.getItem('lastURL');

        if (lastURL) {
            localStorage.setItem('secondLastUrl', lastURL);
        }

        if (currentURL) {
            if (currentURL != '/planning-tool')
                localStorage.setItem('lastURL', currentURL);
        }
        localStorage.setItem('currentURL', location?.pathname);
    }, [location]);
}
