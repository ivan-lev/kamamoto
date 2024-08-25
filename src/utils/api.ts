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

const createExhibition = (exhibition: Exhibition) => {
  return fetch(`${BASE_URL}/exhibitions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exhibition)
  }).then(response => checkResponseStatus(response));
};

const updateExhibition = (exhibition: Exhibition) => {
  return fetch(`${BASE_URL}/exhibitions/${exhibition.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exhibition)
  }).then(response => checkResponseStatus(response));
};

const deleteExhibition = (exhibition: Exhibition) => {
  return fetch(`${BASE_URL}/exhibitions/${exhibition.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  }).then(response => checkResponseStatus(response));
};

const checkResponseStatus = (res: any) => {
  if (!res.ok) {
    console.log(`Ошибка: ${res.status}`);
    return Promise.reject(res);
  }
  return res.json();
};

export const api = {
  getExhibits,
  getExhibitions,
  createExhibition,
  updateExhibition,
  deleteExhibition
};
