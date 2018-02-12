import React from 'react';
/**
 * 
 * @desc the functional component returns the footer if the page
 * @returns { void }
 */
const Footer = () => {
  return (
    <div className="mastfoot">
      <div className="footer-left">
        <img src="/img/ncua-2.png" width="40" height="50" />
        <div className="footer-left-trademark">
          <span className="">
            2013 ABNB Federal Credit Union. All rights reserved
         </span>
          <span>Disclosures</span>
        </div>
      </div>
      <div className="footer-logo-right">
        <img src="/img/NCUA-logo.jpg" width="100" height="50" />
      </div>
    </div>
  );
};

export default Footer;
