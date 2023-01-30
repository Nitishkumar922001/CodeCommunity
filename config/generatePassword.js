module.exports = genratePassword = () => {
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$1234567890';
    let password = '';
    for (let i = 1; i <= 8; i++) 
    {  const index = Math.floor(Math.random() * 65);
        password += str.charAt(index);
    }
    // console.log(password)
    return password;
}
