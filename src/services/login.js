import axios from 'axios';

import { login_endpoint } from '../constants/api_constants'

async function login(jwt) {
    await axios.post(login_endpoint, {'jwt': jwt});
}

export default async function oauth_login_from_response(response, update_loggedin) {
    await login(response.tokenId)
    update_loggedin()
}