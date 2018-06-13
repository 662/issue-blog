---
title: 关于Nginx中“no resolver defined to resolve xxx.xxx“的问题
date: 2018-03-23 20:50:02
categories: work
tags: nginx
---
在 Nginx 配置文件中使用变量来存放一个http地址时，如果这个地址是域名而不是IP，如下所示：

```
    set $server_domain          "http://yourdomain:8080";
    location ^~ /api {
        proxy_pass $server_domain;
        rewrite ^/api/?(.*)$ "/$1" break;
        proxy_set_header Host       $host;
        proxy_set_header X-Real-IP  $remote_addr;
    }
```

这个配置中的代理是会出错的，错误信息是

```
    no resolver defined to resolve yourdomain
```

但是如果我们不申明变量 $server_domain，而是直接设置 proxy_pass

```
    location ^~ /api {
        proxy_pass http://yourdomain:8080;
        rewrite ^/api/?(.*)$ "/$1" break;
        proxy_set_header Host       $host;
        proxy_set_header X-Real-IP  $remote_addr;
    }
```

这时候代理就会生效，毫无问题

原因是 Nginx 0.6.18以后的版本中启用了一个resolver指令，在使用变量来构造某个server地址的时候一定要用resolver指令来指定DNS服务器的地址，所以解决这个问题的方法很简单：在nginx的配置文件中的http{}部分添加一行DNS地址即可

```
    resolver 8.8.8.8;
```

此外，如果有ipv6环境的机器，还可以加上ipv6=off指令，避免一些奇葩原因导致的no resolver defined to resolve错误。

```
    resolver 8.8.8.8 ipv6=off;
```