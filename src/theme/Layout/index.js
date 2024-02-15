import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Don't forget to import the CSS
import { useHistory } from 'react-router-dom';

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
    window.addEventListener('load', handleLoad);
  
    return () => {
      window.removeEventListener('load', handleLoad);
      NProgress.remove();
    };
  }, [history]);  

  return <OriginalLayout {...props} />;
};

export default LayoutWrapper;