import mixpanel from 'mixpanel-browser';
// import ReactGA from 'react-ga';
require('dotenv').config();
mixpanel.init(process.env.REACT_APP_KEY);
export default mixpanel;