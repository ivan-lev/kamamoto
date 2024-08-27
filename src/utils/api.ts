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

const getExhibitionById = (id: string) => {
  return fetch(`${BASE_URL}/exhibitions/${id}`, {
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

const getStatistics = () => {
  return fetch(`${BASE_URL}/statistics/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${TOKEN}` }
  }).then((response: any) => checkResponseStatus(response));
};

// USER SECTION

const authorize = (email: string, password: string) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(response => checkResponseStatus(response));
};

const checkToken = (token: string) => {
  return fetch(`${BASE_URL}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(response => checkResponseStatus(response));
};

export const api = {
  getExhibits,
  getExhibitions,
  getExhibitionById,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  getStatistics,
  authorize,
  checkToken
};
