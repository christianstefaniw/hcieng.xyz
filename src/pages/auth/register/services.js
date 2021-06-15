import axios from 'axios';

import { standard_register_endpoint, oauth_register_endpoint } from '../../../constants/api_constants'
import { AccountInfo } from '../../../services/account'


export class OauthRegister {
    static async oauth_register_from_response(response, add_account_info) {
        let account = await OauthRegister._register(response.tokenId)
        let accountObj = AccountInfo.fromJson(account.data)
        add_account_info(accountObj)
    }

    static async _register(jwt) {
        return await axios.post(oauth_register_endpoint, { 'jwt': jwt }, { withCredentials: true });
    }
}

export async function register(email, first_name, last_name, password, add_account_info) {
    let data = {
        'email': email,
        'first': first_name,
        'last': last_name,
        'pass': password
    }
    let account = await axios.post(standard_register_endpoint, data, { withCredentials: true });
    let accountObj = AccountInfo.fromJson(account.data);
    add_account_info(accountObj);
}