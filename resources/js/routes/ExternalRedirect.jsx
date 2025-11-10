import { useEffect } from "react";

const ExternalRedirect = ({ to }) => {
    useEffect(() => {
        if (to) {
            window.location.replace(to);
        }
    }, [to]);

    return null;
};

export default ExternalRedirect;

