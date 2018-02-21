const fs = require('async-file');


const fileRead = async(path) => {
    let data = await fs.readFile(path);
    return JSON.parse(data);
} 

module.exports = {
    fileRead
}