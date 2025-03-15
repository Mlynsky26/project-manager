import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Mateusz Moniowski. All Rights Reserved.</p>
        <ul className="list-inline mt-2 mb-0">
          <li className="list-inline-item">
            <a href="#" className="text-light">Privacy Policy</a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="#" className="text-light">Terms of Service</a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="#" className="text-light">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;