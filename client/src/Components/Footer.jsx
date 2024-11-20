import "./Footer.scss";
const Footer = () => {
  console.log("footer");
  return (
    <div>
      <footer class="section-p1">
        <div class="col">
          {/* <img src="images/logo3.png" class="logo" alt="" /> */}
          <h4>Contact</h4>
          <p>
            <strong>Address: </strong>562 Wellington road, Street 32,San
            Francisco
          </p>
          <p>
            <strong>Phone: </strong>+91 10182983928
          </p>
          <p>
            <strong>Hours: </strong>10:00 - 18:00 Mon - Sat
          </p>
          <h4>Follow Us</h4>
          <div>
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-youtube"></i>
          </div>
        </div>
        <div class="col1">
          <h4>About</h4>
          <p>About Us</p>
          <p>Delivery Information</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Contact Us</p>
        </div>
        {/* <div class="col1">
          <h4>My Account</h4>
          <p>Sign In</p>
          <p>My WishList</p>
          <p>Track My Order</p>
          <p>Help</p>
        </div> */}
      </footer>
    </div>
  );
};
export default Footer;
