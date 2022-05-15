// import { getPasswordHash, setPasswordHash } from '../chrome/storage'
const bcrypt = require('bcryptjs')

export const storePassword = (password: string) => {
    const hash = bcrypt.hashSync(password, 10)
    chrome.storage.local.set({password : hash})
}

export const checkPasswordIsCorrect = (password: string, callback: (result: boolean) => void) => {
    chrome.storage.local.get('password', function(result) {
        if( bcrypt.compareSync(password, result.password)) {
            callback(true);
        }
        else {
            callback(false);
        }
    });
}

export const checkPasswordConsistence = (password1: string, password2: string): boolean => {
    return password1===password2;
}

// length 8~15, at leat one letter & one number 
export const checkPasswordIsValid =  (password: string): boolean => {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password)); 
}
