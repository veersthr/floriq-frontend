// This is a utility function wrapping fetch to automatically attach the Auth Token
// to API requests protecting Admin features or fetching logged-in user data.

export const fetchWithAuth = async (url, options = {}) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // If a token exists, attach it as a Bearer string in the Authorization header
  if (userInfo && userInfo.token) {
    headers.Authorization = `Bearer ${userInfo.token}`;
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  return response;
};
