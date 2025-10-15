import { Box } from "@mui/material";
import apiConfig from "config/api"; // Import our API configuration

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${apiConfig.baseURL}/assets/${image}`}
        onError={(e) => {
          // Prevent infinite loop if fallback image also fails
          if (e.target.src.includes('linkedin.png')) return;
          
          // Fallback to a placeholder image if the image fails to load
          e.target.onerror = null;
          e.target.src = `${apiConfig.baseURL}/assets/linkedin.png`;
        }}
      />
    </Box>
  );
};

export default UserImage;
