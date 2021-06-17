import axios from 'axios';

import { account_info_endpoint } from '../constants/api_constants'

export async function get_account_info() {
    return await axios.get(account_info_endpoint, { withCredentials: true }).then(res => {
        let account_info = AccountInfo.from_json(res.data);
        return account_info
    })
        .catch(function (_) { return false });
}

export class AccountInfo {
    constructor(email, first, last, is_admin) {
        this.email = email;
        this.first = first;
        this.last = last;
        this.is_admin = is_admin;
    }

    static from_json(json) {
        return new AccountInfo(
            json['email'],
            json['first'],
            json['last'],
            json['admin']
        )
    }
}