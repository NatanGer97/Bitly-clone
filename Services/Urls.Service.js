

const generateCode = () => {
    const codeSize = process.env.SHORT_URL_SIZE;
    let code = [];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < codeSize; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code.push(chars.charAt(randomIndex));
    }

    return code.join("");

};

module.exports = {generateCode,};