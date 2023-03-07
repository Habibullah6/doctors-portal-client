import React from "react";
import { Link } from "react-router-dom";
import footerBg from "../../../assets/images/footer.png";


const Footer = () => {
  const footerStyle = {
    background: `url(${footerBg})`,
    backgroundSize: '100% 100%',
    
  }
  return (
    <footer className="p-10 mt-32" style={footerStyle}>
      <div className="footer"> 
      <div>
        <span className="footer-title">Services</span>
        <Link to='/' className="link link-hover">Emergency Checkup</Link>
        <Link to='/' className="link link-hover">Monthly Checkup</Link>
        <Link to='/' className="link link-hover">Weekly Checkup</Link>
        <Link to='/' className="link link-hover">Deep Checkup</Link>
      </div>
      <div>
        <span className="footer-title">Oral Health</span>
        <Link to='/' className="link link-hover">Fluoride Treatment</Link>
        <Link to='/' className="link link-hover">Cavity Filling</Link>
        <Link to='/' className="link link-hover">Teeth Whitening</Link>
        
      </div>
      <div>
        <span className="footer-title">Our Address</span>
        <Link to='/' className="link link-hover">New York - 101010 Hudson</Link>
        
      </div>
      </div>

      <div className="flex justify-center mt-20">
      <p>Copyright 2022 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
