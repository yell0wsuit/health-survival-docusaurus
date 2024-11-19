import React from "react";
import OriginalLayout from "@theme-original/Layout";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useHistory } from "react-router-dom";

import ImageZoom from "@site/src/components/ImageZoom";

const LayoutWrapper = (props) => {
    const history = useHistory();

    React.useEffect(() => {
        NProgress.configure({ showSpinner: true });

        // Start NProgress before a route change
        const startNProgress = () => NProgress.start();

        // Stop NProgress after a route change
        const stopNProgress = () => NProgress.done();

        // Listen for route changes
        history.listen(() => {
            startNProgress();
            // Consider removing the timeout here and relying on the subsequent page's load event
            // or another signal from Docusaurus when the page is fully rendered
        });

        // Start NProgress on initial load
        startNProgress();
        stopNProgress();

        // Attach to window load event for the initial load
        const handleLoad = () => {
            stopNProgress();
        };
        window.addEventListener("load", handleLoad);

        return () => {
            window.removeEventListener("load", handleLoad);
            NProgress.remove();
        };
    }, [history]);

    return (
        <>
            <OriginalLayout {...props} />
            <ImageZoom />
            <SpeedInsights />
            <div className="fbgdbg d-none" id="coloredBgToggleDiv">
                <div className="blue-gradient"></div>
                <div className="green-gradient" id="greenAnimation"></div>
                <div className="yellow-gradient"></div>
                <div className="red-gradient"></div>
                <div className="blue-gradient-bottom" id="blueAnimation"></div>
                <div className="purple-gradient" id="purpleAnimation"></div>
            </div>
        </>
    );
};

export default LayoutWrapper;
