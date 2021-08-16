import { EMAIL } from '../../constants/api-constants';
import hciEngAxios from '../axios/hci-eng-axios';

export async function email(name, email, message, recaptchaData) {
    const response = await hciEngAxios.post(EMAIL, { name: name, email: email, message: message, recaptchaData: recaptchaData })
        .then((response) => response)
        .catch((err) => ({ error: err.response }))
        
    return response;
}