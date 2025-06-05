import "../../assets/styles/_common.scss";
import githubIcon from "../../../public/githubIcon.svg";

function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} IMTV-Play. Developed with 💜 by{" "}
        <span className="glowText">AdriMacedo</span>
        <a
          href="https://github.com/AdriMacedo/IMTV-Play"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-github"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>
      </p>
    </footer>
  );
}

export default Footer;
