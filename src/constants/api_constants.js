import config from '../config'

const auth = 'auth'
export const base = config.DEBUG ? 'http://localhost:8080' : 'https://hcieng-server.herokuapp.com';
export const email_endpoint = `${base}/email`;
export const login_endpoint = `${base}/${auth}/login`