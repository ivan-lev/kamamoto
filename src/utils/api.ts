import { PATHS } from '../variables/variables';

const { BASE_URL, EXHIBITIONS, EXHIBITS, PARTNERS, SIGNIN, STATISTICS, USERS } = PATHS;

import type { Exhibition } from '../types/exhibitionType';
import type { Partner } from '../types/partnerType';

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
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(response => checkResponseStatus(response));
};

// Get requests

const getExhibits = () => {
  return fetch(`${BASE_URL}/${EXHIBITS}/`, {
    method: 'GET'
  }).then((response: any) => checkResponseStatus(response));
};

const getExhibitions = () => {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/`, {
    method: 'GET'
  }).then((response: any) => checkResponseStatus(response));
};

const getExhibitionById = (id: string) => {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/${id}`, {
    method: 'GET'
  }).then((response: any) => checkResponseStatus(response));
};

const getStatistics = () => {
  return fetch(`${BASE_URL}/${STATISTICS}/`, {
    method: 'GET'
  }).then((response: any) => checkResponseStatus(response));
};

const getPartners = () => {
  return fetch(`${BASE_URL}/${PARTNERS}/`, {
    method: 'GET'
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

const updatePartner = (token: string, partner: Partner) => {
  return fetch(`${BASE_URL}/${PARTNERS}/${partner._id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partner)
  }).then((response: any) => checkResponseStatus(response));
};

const deletePartner = (token: string, id: string) => {
  return fetch(`${BASE_URL}/${PARTNERS}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(response => checkResponseStatus(response));
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
  updatePartner,
  checkToken,
  deletePartner
};
