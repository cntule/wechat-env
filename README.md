# 微信小程序环境变量配置 

# 环境配置文件  
- env.yml 默认配置文件  
- env.prod.yml  正式环境    
- env.test.yml  测试环境  

### 生成环境配置文件  
```shell script
  # 默认配置文件（读取 env.yml ）
  wechat-env  

  # 正式环境，在根目录下创建 env.prod.yml ，env.prod.yml 与 env.yml 进行合并 merge(env.yml,env.prod.yml)  
  wechat-env -e prod
```


# 命令行       

```shell script
  # wechat-env 命令选项 
  wechat-env -h
  Options:
  -e, --envName [name]   默认读取文件名：env.yml
  -s, --savePath [path]  默认保存目录：miniprogram
  -n, --saveName [name]  默认保存文件名：env.config.ts
  -f, --flat [y/n]       第一层拉平：n

  # 指定环境配置文件
  wechat-env -e [prod]
  
  # 默认保存路径；根目录：miniprogram/env.config.ts
  wechat-env -s [miniprogram] 

  # 默认保存文件名称
  wechat-env -n [env.config.ts]
  
  # 第一层拉平
  wechat-env -f y

  # 完整命令
  wechat-env -e prod -s miniprogram -n env.config.ts -f y
```

- wechat-env -f n 示例 (默认)
```typescript
export default {
  "NODE_ENV": "development",
  "name": "wechat-env",
  "api": "http://wechat-env.xxmi.cn",
  "colors": [
    "red",
    "blue"
  ],
  "colorsList": [
    {
      "color": "red"
    }
  ]
}
```

- wechat-env -f y 示例
```typescript
export const NODE_ENV = "development"
export const name = "wechat-env"
export const api = "http://wechat-env.xxmi.cn"
export const colors = [
  "red",
  "blue"
]
export const colorsList = [
  {
    "color": "red"
  }
]
```


# 批量修改后缀名
```shell script
  # 把所有 .wxss 结尾的改为 .scss 结尾
  re-suffix -b .wxss -a .scss

  Options:
  -b, --beforeSuffix [.wxss]  将要改的文件名后缀
  -a, --afterSuffix [.scss]   改变后的文件名后缀

```
