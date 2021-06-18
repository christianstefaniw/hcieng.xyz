import config from '../config'

const auth = 'auth'
const account = 'account'
const chat = 'chat'
const domain_name = config.DEBUG ? 'localhost:8080' : 'https://hcieng-server.herokuapp.com';
export const base = config.DEBUG ? 'http://localhost:8080' : 'https://hcieng-server.herokuapp.com';
export const email_endpoint = `${base}/email`;
export const standard_register_endpoint = `${base}/${auth}/register`
export const oauth_register_endpoint = `${base}/${auth}/register/google`
export const standard_login_endpoint = `${base}/${auth}/login`
export const oauth_login_endpoint = `${base}/${auth}/login/google`
export const account_info_endpoint = `${base}/${account}/info`
export const all_user_rooms = `${base}/${chat}/allrooms`
export const websocket = `ws://${domain_name}/chat/room`
export const room_info = `${base}/${chat}/info`