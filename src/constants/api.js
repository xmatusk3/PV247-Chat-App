const API_URI = 'https://pv247messaging.azurewebsites.net/api';
const API_APP_ID = 'b137c7c8-29d8-4ac0-b61e-7c4ce6dc87a3';

export const API_APP_URI = `${API_URI}/app/${API_APP_ID}`;
export const API_USER_ALL = `${API_URI}/${API_APP_ID}/user`;
export const API_MESSAGE = (channelId) => `${API_APP_URI}/channel/${channelId}/message`;
export const API_AUTH_URI = `${API_URI}/auth`;
export const API_FILE_URI = `${API_URI}/file`;
export const fetchApiUserUri = (userEmail) => (`${API_URI}/${API_APP_ID}/user/${encodeURIComponent(userEmail)}`);
export const createApiFilerUri = (fileId) => `${API_URI}//file/${fileId}/download-link`;
