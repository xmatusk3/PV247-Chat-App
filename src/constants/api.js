const API_URI = 'https://pv247messaging.azurewebsites.net/api';
const API_APP_ID = '7ffcaf56-d36a-4a93-a8d9-b2c04571c10a';

export const API_AUTH_URI = `${API_URI}/auth`;
export const API_FILE_URI = `${API_URI}/file`;
export const createApiUserUri = (userEmail) => encodeURIComponent(`${API_URI}/${API_APP_ID}/user/"${userEmail}"`);
export const createApiFilerUri = (fileId) => `${API_URI}//file/${fileId}/download-link`;

export const USER_EMAIL = 'admin@admin.admin';
export const USER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5hZG1pbiIsImp0aSI6IjUxOTBiMGE0LWFjY2UtNDJkNS05NzFiLWFlOTM3YzhlNTAzMSIsImlhdCI6MTUxMTYwOTAxMiwibmJmIjoxNTExNjA5MDEyLCJleHAiOjE1MTE2OTU0MTIsImlzcyI6IlBWMjQ3IEFQSSIsImF1ZCI6IlBWMjQ3IFN0dWRlbnRzIn0.fQgFADvXncXWpclvbwGT_cS9UEKcGbSOMD-qIOuuB0Q';

