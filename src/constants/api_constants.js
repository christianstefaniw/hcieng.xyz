import config from '../config'


export const base = config.DEBUG ? 'http://localhost:8080' : 'https://hcieng-server.heroku.app';
export const email_endpoint = `${base}/email`;