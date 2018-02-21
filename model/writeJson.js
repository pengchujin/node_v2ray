const fs = require('async-file');

const writeJson = async (path,data) => {
   await fs.write(path,data);
   var stats = await fs.stat(path);
   console.log('修改成功： ' + stats);
}