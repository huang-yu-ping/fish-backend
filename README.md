# 大專漁會後台
本專案使用 Node (Express + Mysql)

# 版本
- npm = 6.14.11
- node = v14.16.0

# 開始

1. clone 專案
```
git clone https://github.com/huang-yu-ping/fish-backend.git
```

2. 下載 dependencies
```
$ npm install
```

3. 安奘 mySQL

4. 
```
$ npm install nodemon -g
```

5. 創建 config/ 檔案夾, 裡面有 :
- config.json
```
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": ""
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
``` 

- email-secret.js
```
module.exports = {
    emailKey: '',
    apiKey: ""
}
```

- jwt-secret.js
```
module.exports = {
    jwtSecret: ''
}
```

- key.js
```
module.exports = {
    google: {
        clientID: '',
        clientSecret: ''
    }
}
```

6. 
```
$ npm start
```

# Dependencies

- expressjs
- express-validator
- jsonwebtoken
- bcrypt 
- bluebird
- cors
- dotenv
- mailgun-js
- morgan
- multer
- mysql
- mysql2
- passport
- passport-google-token
- random-number
- sequelize
- sequelize-automate
- sequelize-cli

# 專案結構

- app.js : 出口文件
- config/ : 資料庫連接, email api key, jwt secret, google api key
- router/ : 我api定義路由
- models/ : 定義mysql的schema
- controllers/ : 處理業務邏輯
- validator/ : 處理前端資料來源驗證
