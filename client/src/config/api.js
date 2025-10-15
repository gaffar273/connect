// API Configuration
const getConfig = () => {
  // Try to get the backend URL from environment variables
  // For Create React App, environment variables must be prefixed with REACT_APP_
  let backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  // Log the backend URL for debugging
  console.log('REACT_APP_BACKEND_URL from env:', process.env.REACT_APP_BACKEND_URL);
  console.log('Using backendUrl:', backendUrl);
  
  // Fallback URL if environment variable is not set
  if (!backendUrl) {
    console.warn('REACT_APP_BACKEND_URL not found in environment variables, using default');
    // Use a more appropriate default that matches the server configuration
    backendUrl = process.env.NODE_ENV === 'production' 
      ? window.location.origin.replace(/:\d+$/, '') // Remove port for production
      : 'http://localhost:3003'; // Development default that matches your configured port
  } else {
    console.log('Successfully loaded backend URL from environment variable');
  }
  
  // Clean the URL to prevent malformed paths
  const cleanUrl = backendUrl.replace(/\/$/, '').replace(/undefined/g, '');
  
  console.log('API Base URL:', cleanUrl);
  
  return {
    baseURL: cleanUrl,
    endpoints: {
      login: `${cleanUrl}/auth/login`,
      register: `${cleanUrl}/auth/register`,
      users: `${cleanUrl}/users`,
      posts: `${cleanUrl}/posts`,
    }
  };
};

export default getConfig();