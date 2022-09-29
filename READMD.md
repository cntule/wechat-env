# wechat-env 环境变量配置 

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

  # 指定环境配置文件
  wechat-env -e [prod]
  
  # 默认保存路径；根目录：miniprogram/env.config.ts
  wechat-env -s [miniprogram] 

  # 默认保存文件名称
  wechat-env -n [env.config.ts]

  # 完整命令
  wechat-env -e prod -s miniprogram -n env.config.ts
```
