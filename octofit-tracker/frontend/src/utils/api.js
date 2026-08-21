export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function getApiUrl(resource) {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/${resource}/`;
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  const nestedData = payload?.data ?? payload?.results ?? payload?.items;

  if (Array.isArray(nestedData)) {
    return nestedData;
  }

  return [];
}
