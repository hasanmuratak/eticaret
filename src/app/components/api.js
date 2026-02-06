

const BASE_URL = 'http://localhost:3001/api';

export const request = async (endpoint, options = {}) => {
  // 1. LocalStorage'dan kullanıcıyı al (ve içindeki token'ı)
  const user = JSON.parse(localStorage.getItem('user'));
  
  const headers = {
    'Content-Type': 'application/json',
    ...(user?.token && { 'Authorization': `Bearer ${user.token}` }), // Token varsa ekle
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
  // 401 hatası gelirse (token geçersizse) kullanıcıyı logout yapabilirsin
  if (response.status === 401) {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return response.json();
};