import { get_account_info } from './account'

export default async function check_logged_in() {
    return await get_account_info();
}