import axios from 'axios';

import { standard_login_endpoint, oauth_login_endpoint } from '../../../constants/api_constants'
import { AccountInfo } from '../../../services/account'


export class OauthLogin {
    static async oauth_login_from_response(response, add_account_info) {
        let account = await OauthLogin._login(response.tokenId)
        let accountObj = AccountInfo.from_json(account.data)
        add_account_info(accountObj)
    }

    static async _login(jwt) {
        return await axios.post(oauth_login_endpoint, { 'jwt': jwt }, { withCredentials: true });
    }
}

export async function login(email, password, add_account_info) {
    let account = await axios.post(standard_login_endpoint, { 'email': email, 'pass': password }, { withCredentials: true });
    let accountObj = AccountInfo.from_json(account.data);
    add_account_info(accountObj);
}