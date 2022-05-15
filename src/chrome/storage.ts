export const setPasswordHash = (value: string): void => {
    chrome.storage.local.set({password : value}, function() {
        alert('Value is set to ' + value);
    })
}

export const getPasswordHash = (): any => {
    chrome.storage.local.get('password', function(result) {
        alert("pass:"+result.password)
        return result.password
    });
}
