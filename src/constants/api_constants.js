import config from '../config'


export const base = config.DEBUG ? 'http://localhost:8080' : 'https://hcieng-server.herokuapp.com';
export const email_endpoint = `${base}/email`;