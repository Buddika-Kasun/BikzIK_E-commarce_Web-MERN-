import React, { useEffect, useState } from "react";
const useMobile = (breakpoint = 768) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    const handleResize = () => {
        setIsMobile(window.innerWidth < breakpoint);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // cleanup function to remove event listener on unmounting
    }, []);

    return [isMobile];

};

export default useMobile;