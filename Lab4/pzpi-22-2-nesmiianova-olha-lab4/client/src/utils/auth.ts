interface DecodedToken {
  role: 'student' | 'teacher' | 'admin';
  // Add other JWT payload fields if needed
}

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem('token');
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserRole = (): string | null => {
  const token = getTokenFromStorage();
  if (!token) return null;
  
  const decoded = decodeToken(token);
  return decoded?.role || null;
}; 