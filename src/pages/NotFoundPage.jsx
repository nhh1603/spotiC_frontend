import { useNavigate } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="not-found-container">
			<div className="not-found-icon">
                <FaSpotify 
                    className="icon"
                    size="60px"
                    color="#1DB954"
                />
			</div>
			<div className="not-found-content">
                <h1>Page Not Found</h1>
                <p>We cannot find the page that you are looking for</p>
                <button onClick={() => navigate("/")}>Go Back Home</button>
			</div>
		</div>
	);
};

export default NotFoundPage;