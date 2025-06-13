import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function LastUrl() {
    const location = useLocation();
    console.log(location?.pathname)
    useEffect(() => {
        // if (location?.pathname.startsWith('/sweets') || location?.pathname.startsWith('/sweets-info/') || location?.pathname.startsWith('/dry-fruit_info/') || location.pathname.startsWith('/invitation-detail/')) {
        window.scrollTo(0, 0);
        // }
    }, [location?.pathname]);

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
