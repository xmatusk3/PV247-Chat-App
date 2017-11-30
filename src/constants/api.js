const API_URI = 'https://pv247messaging.azurewebsites.net/api';
const API_APP_ID = '7ffcaf56-d36a-4a93-a8d9-b2c04571c10a';

export const API_APP_URI = `${API_URI}/app/${API_APP_ID}`;
export const API_AUTH_URI = `${API_URI}/auth`;
export const API_FILE_URI = `${API_URI}/file`;
export const fetchApiUserUri = (userEmail) => (`${API_URI}/${API_APP_ID}/user/${encodeURIComponent(userEmail)}`);
export const createApiFilerUri = (fileId) => `${API_URI}//file/${fileId}/download-link`;

export const USER_EMAIL = 'admin@admin.admin';

