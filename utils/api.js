export function apiPath(route) {
    const host = process.env.API_HOST || 'http://localhost';
    const port = process.env.API_PORT || 3000;
    const basePath = process.env.BASE_PATH || '/api';
  
    return `${host}:${port}${basePath}${route}`; 
}

// export function apiPath(route) {
//     const host = 'https://modern-time-off.vercel.app/';
//     const basePath = process.env.BASE_PATH || '/api';
  
//     return `${host}${basePath}${route}`; 
// }
