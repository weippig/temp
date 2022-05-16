const bcrypt = require('bcryptjs')

export function storePassword(password: string){
    const hash = bcrypt.hashSync(password, 10)
    chrome.storage.local.set({password : hash})
}

export function checkPasswordIsCorrect(password: string, callback: (result: boolean) => any) {
    chrome.storage.local.get('password', function(result) {
        callback(bcrypt.compareSync(password, result.password))
    });
}

export function checkPasswordConsistence(password1: string, password2: string): boolean {
    return password1===password2;
}

// length 8~15, at leat one letter & one number 
export function checkPasswordIsValid(password: string): boolean {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,14}$/.test(password)); 
}
