import { EMAIL } from '../../constants/api-constants';
import hciEngAxios from '../axios/hci-eng-axios';

export async function email(name, email, message, recaptcha_data) {
    const response = await hciEngAxios.post(EMAIL, { name: name, email: email, message: message, recaptcha_data: recaptcha_data })
        .then((response) => response)
        .catch((err) => ({ error: err.response }))
        
    return response;
}