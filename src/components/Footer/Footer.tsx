import "../../assets/styles/_common.scss";

function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} IMTV-Play. Developed with 💜 by{" "}
        <span className="glowText">AdriMacedo</span>
      </p>
    </footer>
  );
}

export default Footer;
