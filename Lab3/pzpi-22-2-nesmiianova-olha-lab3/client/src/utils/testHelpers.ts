// This is a helper function for testing purposes only
// DO NOT USE IN PRODUCTION

export const setTestToken = (role: 'student' | 'teacher' | 'admin') => {
  // Create a simple JWT-like token structure
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    role: role,
    name: `Test ${role}`,
    exp: Date.now() + 3600000 // 1 hour from now
  }));
  const signature = 'test_signature'; // This is just for testing

  const token = `${header}.${payload}.${signature}`;
  localStorage.setItem('token', token);
};

export const clearTestToken = () => {
  localStorage.removeItem('token');
}; 