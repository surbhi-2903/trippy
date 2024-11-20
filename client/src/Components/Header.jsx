import "./Header.scss";
// import
const Header = () => {
  return (
    <div className="headerdiv">
      <video className="headervideo" autoPlay={true} loop={true} muted={true}>
        <source src="/videos/nature1.webm" type="video/webm" />
          </video>
          <p className="headertext1">Discover Amazing Places</p>
    </div>
  );
};
export default Header;
