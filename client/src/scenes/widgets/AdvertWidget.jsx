import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import apiConfig from "config/api"; // Import our API configuration

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src={`${apiConfig.baseURL}/assets/info4.jpeg`}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
                onError={(e) => {
                  // Prevent infinite loop if fallback image also fails
                  if (e.target.src.includes('linkedin.png')) return;
                  
                  e.target.onerror = null;
                  e.target.src = `${apiConfig.baseURL}/assets/linkedin.png`;
                }}
            />
            <FlexBetween>
                <Typography color={main}>MikaCosmetics</Typography>
                <Typography color={medium}>mikacosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Your pathway to stunning and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;
