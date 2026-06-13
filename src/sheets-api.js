const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
const DEFAULT_TIMEOUT_MS = 12000;
const UNAUTHORIZED_ERROR = 'Unauthorized';

let apiPassword = '';

export function setApiPassword(password) {
  apiPassword = String(password || '');
}

export function clearApiPassword() {
  apiPassword = '';
}

export function isUnauthorizedError(error) {
  return error?.code === UNAUTHORIZED_ERROR || error?.message === UNAUTHORIZED_ERROR;
}

export async function fetchBootstrapFromSheets() {
  if (!API_URL) throw new Error('Не настроен адрес Google Apps Script');
  return getFromSheets('bootstrap');
}

export async function fetchTransactionsFromSheets() {
  if (!API_URL) throw new Error('Не настроен адрес Google Apps Script');
  return getFromSheets('transactions');
}

export async function appendTransactionToSheets(transaction) {
  if (!API_URL) throw new Error('Не настроен адрес Google Apps Script');
  return postToSheets('appendTransaction', transaction);
}

export async function updateTransactionInSheets(transaction) {
  if (!API_URL) throw new Error('Не настроен адрес Google Apps Script');
  return postToSheets('updateTransaction', transaction);
}

export async function updateAccountInSheets(account) {
  if (!API_URL) throw new Error('Не настроен адрес Google Apps Script');
  return postToSheets('updateAccount', account);
}

export async function answerMonthlyReviewInSheets(answer) {
  if (!API_URL) throw new Error('Не настроен адрес Google Apps Script');
  return postToSheets('answerMonthlyReview', answer);
}

async function getFromSheets(action) {
  ensureApiPassword();
  const url = new URL(API_URL, window.location.href);
  url.searchParams.set('action', action);
  url.searchParams.set('password', apiPassword);
  return requestSheets(action, url.toString(), { method: 'GET' });
}

async function postToSheets(action, payload) {
  ensureApiPassword();
  return requestSheets(action, API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, password: apiPassword, payload })
  });
}

function ensureApiPassword() {
  if (!apiPassword) throw new Error('Требуется пароль');
}

async function requestSheets(action, url, init, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) throw new Error(`Google Sheets ответил с ошибкой ${res.status}`);

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      throw new Error('Apps Script вернул не JSON. Проверьте доступ к Web App.');
    }

    if (data && data.ok === false) throw apiError(data.error || 'Google Sheets вернул ошибку');

    return data;
  } catch (error) {
    const normalized = error?.name === 'AbortError'
      ? new Error('Google Sheets долго отвечает. Попробуйте еще раз.')
      : error;
    console.warn(`Apps Script request failed: ${action}`, normalized);
    throw normalized;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function apiError(message) {
  const error = new Error(message);
  if (message === UNAUTHORIZED_ERROR) error.code = UNAUTHORIZED_ERROR;
  return error;
}
