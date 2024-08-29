import { PATHS } from '../variables/variables';

const { BASE_URL, EXHIBITIONS, EXHIBITS, PARTNERS, SIGNIN, STATISTICS, USERS } = PATHS;

import type { Exhibition } from '../types/exhibitionType';

// Authorization logic

const authorize = (email: string, password: string) => {
  return fetch(`${BASE_URL}/${SIGNIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(response => checkResponseStatus(response));
};

const checkToken = (token: string) => {
  return fetch(`${BASE_URL}/${USERS}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(response => checkResponseStatus(response));
};

// Get requests

const getExhibits = (token: string) => {
  return fetch(`${BASE_URL}/${EXHIBITS}/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }).then((response: any) => checkResponseStatus(response));
};

const getExhibitions = (token: string) => {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }).then((response: any) => checkResponseStatus(response));
};

const getExhibitionById = (token: string, id: string) => {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }).then((response: any) => checkResponseStatus(response));
};

const getStatistics = (token: string) => {
  return fetch(`${BASE_URL}/${STATISTICS}/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }).then((response: any) => checkResponseStatus(response));
};

const getPartners = (token: string) => {
  return fetch(`${BASE_URL}/${PARTNERS}/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }).then((response: any) => checkResponseStatus(response));
};

// Admin requests

const createExhibition = (token: string, exhibition: Exhibition) => {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exhibition)
  }).then(response => checkResponseStatus(response));
};

const updateExhibition = (token: string, exhibition: Exhibition) => {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/${exhibition.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exhibition)
  }).then(response => checkResponseStatus(response));
};

const deleteExhibition = (token: string, exhibition: Exhibition) => {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/${exhibition.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(response => checkResponseStatus(response));
};

const createPartner = (
  token: string,
  title: string,
  link: string,
  logo: string,
  isActive: boolean
) => {
  return fetch(`${BASE_URL}/${PARTNERS}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, link, logo, isActive })
  }).then((response: any) => checkResponseStatus(response));
};

// Common api logic

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
  getExhibitionById,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  getStatistics,
  authorize,
  getPartners,
  createPartner,
  checkToken
};
