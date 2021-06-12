import axios from 'axios';

import { login_endpoint } from '../constants/api_constants'
import { AccountInfo } from '../services/account'

async function login(jwt) {
    await axios.post(login_endpoint, {'jwt': jwt}, {withCredentials: true});
}

export default async function oauth_login_from_response(response, add_account_info) {
    let account = await login(response.tokenId)
    add_account_info(AccountInfo(account['email']))
}