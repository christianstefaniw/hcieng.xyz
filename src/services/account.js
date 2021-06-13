import axios from 'axios';

import { account_info_endpoint } from '../constants/api_constants'

export async function get_account_info() {
    return await axios.get(account_info_endpoint, { withCredentials: true }).then(res => {
        let account_info = new AccountInfo(res.data);
        return account_info
    })
        .catch(function (_) { return false });
}

export class AccountInfo {
    constructor(email) {
        this.email = email
    }
}