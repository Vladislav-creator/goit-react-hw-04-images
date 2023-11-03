import axios from 'axios';

const API_KEY = '39397565-58f1881c1b7436fe337839852';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchDataApi(query, currentPage = '1') {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: currentPage,
  };

  const response = await axios.get(BASE_URL, { params });
  const data = response.data;
  return data;
}
