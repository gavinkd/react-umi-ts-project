const fs = require('fs');

/*
  需要在本地生成一个公钥和私钥 shh-keygen -t rsa
  使用的是本地保存
  向服务器发送我的公钥文件  ssh-copy-id -i [公钥地址] [服务器地址]
*/
const privateKey = fs.readFileSync('/Users/frank/.ssh/id_rsa');

module.exports = {
  remoteDirectory: 'frank/wwww/app/client',
  options: {
    host: '120.55.194.12',
    port: 22,
    username: 'root',
    privateKey,
    passphrase: 'kakaxione', // 自己私钥的密码
  },
};
