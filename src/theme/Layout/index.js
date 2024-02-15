import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Don't forget to import the CSS
import { useHistory } from 'react-router-dom';

const LayoutWrapper = (props) => {
  const history = useHistory();

  React.useEffect(() => {
    NProgress.configure({ showSpinner: false });

    // Start NProgress before a route change
    const startNProgress = () => NProgress.start();

    // Stop NProgress after a route change
    const stopNProgress = () => NProgress.done();

    // Listen for route changes
    history.listen(() => {
      startNProgress();
      //setTimeout(stopNProgress, 500); // Add a slight delay to ensure transition completion
    });

    // Start NProgress on initial load
    //startNProgress();
    //setTimeout(stopNProgress, 500);

    return () => {
      NProgress.remove();
    };
  }, [history]);

  return <OriginalLayout {...props} />;
};

export default LayoutWrapper;