
import "../../assets/styles/_common.scss";

function Spinner () {

    return (
        <div className="spinner-container">
        <div className="spinner"></div>
        <span className="spinner-text">Loading...</span>
      </div>
    )
};

export default Spinner;
