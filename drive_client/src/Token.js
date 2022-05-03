import axios from 'axios';
import { SERVER_URL, KEY } from './config';

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export async function createToken(setToast) {
  try {
    const token = await axios.post(`${SERVER_URL}/auth`, { key: KEY });
    saveToken(token.data);
  } catch (error) {
    setToast([true, 'warning', 'No logged :(']);
    console.error(error);
  } finally {
    setTimeout(() => {
      setToast([false, '', '']);
    }, 3000);
  }
}
