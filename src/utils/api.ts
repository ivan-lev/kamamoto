import { BASE_URL, TOKEN } from '../../temp/apiVariables';

import type { Exhibition } from '../types/exhibitionType';

const getExhibits = () => {
  return fetch(`${BASE_URL}/exhibits/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${TOKEN}` }
  }).then((response: any) => checkResponseStatus(response));
};

const getExhibitions = () => {
  return fetch(`${BASE_URL}/exhibitions/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${TOKEN}` }
  }).then((response: any) => checkResponseStatus(response));
};

const createExhibition = (data: Exhibition) => {
  return fetch(`${BASE_URL}/exhibitions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => checkResponseStatus(response));
};

const checkResponseStatus = (res: any) => {
  if (!res.ok) {
    console.log(`Ошибка: ${res.status}`);
    return Promise.reject(res);
  }
  return res.json();
};

export const api = { getExhibits, getExhibitions, createExhibition };
