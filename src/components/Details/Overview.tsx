import "../../assets/styles/_common.scss";

interface OverviewProps {
    overview: string;
};

function Overview ({overview}: OverviewProps) {

    return (
        <div className="overview">
            <h2>OVERVIEW</h2>
            <p>{overview || "No description available"}</p>
        </div>
    )
};

export default Overview;
