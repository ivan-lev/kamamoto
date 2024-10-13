import type { Category } from '../types/category';
import type { Exhibition } from '../types/exhibitionType';
import type { Partner } from '../types/partnerType';

import { PATHS } from '../variables/variables';

const { BASE_URL, CATEGORIES, EXHIBITIONS, EXHIBITS, LETTERS, PARTNERS, SIGNIN, STATISTICS, USERS } = PATHS;

// Authorization logic

function authorize(email: string, password: string) {
  return fetch(`${BASE_URL}/${SIGNIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(response => checkResponseStatus(response));
}

function checkToken(token: string) {
  return fetch(`${BASE_URL}/${USERS}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(response => checkResponseStatus(response));
}

// Get requests

function getExhibits() {
  return fetch(`${BASE_URL}/${EXHIBITS}/`, {
    method: 'GET',
  }).then((response: any) => checkResponseStatus(response));
}

function getExhibitions() {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/`, {
    method: 'GET',
  }).then((response: any) => checkResponseStatus(response));
}

function getExhibitionById(id: string) {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/${id}`, {
    method: 'GET',
  }).then((response: any) => checkResponseStatus(response));
}

function getStatistics() {
  return fetch(`${BASE_URL}/${STATISTICS}/`, {
    method: 'GET',
  }).then((response: any) => checkResponseStatus(response));
}

function getPartners() {
  return fetch(`${BASE_URL}/${PARTNERS}/`, {
    method: 'GET',
  }).then((response: any) => checkResponseStatus(response));
}

function getCategories() {
  return fetch(`${BASE_URL}/${CATEGORIES}/`, {
    method: 'GET',
  }).then((response: any) => checkResponseStatus(response));
}

function getLetters() {
  return fetch(`${BASE_URL}/${LETTERS}/`, {
    method: 'GET',
  }).then((response: any) => checkResponseStatus(response));
}

// Admin requests

function createExhibition(token: string, exhibition: Exhibition) {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exhibition),
  }).then(response => checkResponseStatus(response));
}

function updateExhibition(token: string, exhibition: Exhibition) {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/${exhibition.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exhibition),
  }).then(response => checkResponseStatus(response));
}

function deleteExhibition(token: string, exhibition: Exhibition) {
  return fetch(`${BASE_URL}/${EXHIBITIONS}/${exhibition.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(response => checkResponseStatus(response));
}

function createPartner(token: string, title: string, link: string, logo: string, isActive: boolean) {
  return fetch(`${BASE_URL}/${PARTNERS}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, link, logo, isActive }),
  }).then((response: any) => checkResponseStatus(response));
}

function updatePartner(token: string, partner: Partner) {
  return fetch(`${BASE_URL}/${PARTNERS}/${partner._id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partner),
  }).then((response: any) => checkResponseStatus(response));
}

function deletePartner(token: string, id: string) {
  return fetch(`${BASE_URL}/${PARTNERS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(response => checkResponseStatus(response));
}

function createCategory(token: string, category: string, title: string, thumbnail: string) {
  return fetch(`${BASE_URL}/${CATEGORIES}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ category, title, thumbnail }),
  }).then((response: any) => checkResponseStatus(response));
}

function updateCategory(token: string, category: Category) {
  return fetch(`${BASE_URL}/${CATEGORIES}/${category.category}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  }).then((response: any) => checkResponseStatus(response));
}

function deleteCategory(token: string, category: string) {
  return fetch(`${BASE_URL}/${CATEGORIES}/${category}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(response => checkResponseStatus(response));
}

// Common api logic

function checkResponseStatus(res: any) {
  if (!res.ok) {
    console.error(`Ошибка: ${res.status}`);
    return Promise.reject(res);
  }
  return res.json();
}

export const api = {
  getCategories,
  getExhibits,
  getExhibitions,
  getExhibitionById,
  getLetters,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  getStatistics,
  authorize,
  getPartners,
  createPartner,
  updatePartner,
  checkToken,
  deletePartner,
  createCategory,
  updateCategory,
  deleteCategory,
};
