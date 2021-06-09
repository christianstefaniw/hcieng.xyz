import axios from 'axios';

import { email_endpoint } from '../constants/api_constants'

async function email(from_name, from_email, message) {
    let formData = new FormData();
    formData.append('name', from_name)
    formData.append('email-address', from_email)
    formData.append('message', message);

    try {
        await axios.post(email_endpoint, formData);
        return true;
    } catch {
        return false;
    }
}

export default email