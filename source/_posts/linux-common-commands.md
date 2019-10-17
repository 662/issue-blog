---
title: linux常用命令
date: 2019-10-16 22:13:32
categories: work
tags:
- es6
---

命令太多，有些又不常用，记录下一些，以便以后需要用到时不用去查文档

## CentOS7 服务相关

```bash
# 查看服务列表
systemctl list-units --type=service 

# 列出所有已经安装的 服务及状态（可为人所读, 内容简略、清晰）
systemctl list-unit-files

# 列出正在运行的服务状态(基本不为人所读，内容复杂、全面)
systemctl

# 以树形列出正在运行的进程，它可以递归显示控制组内容
systemd-cgls

# 启动服务
systemctl start name.service

# 停止服务
systemctl stop name.service

# 重启服务
systemctl restart name.service

# 查看服务状态
systemctl status name.service

# 开机自启
systemctl enable name.service

# 取消开机自启
systemctl disable name.service

# 查看是否开机自启
systemctl is-enabled postfix.service

# 查看已启动的服务列表
systemctl list-unit-files | grep enabled

# 查看启动失败的服务列表
systemctl --failed

```

**注意：使用命令 `systemctl is-enabled postfix.service` 得到的值可以是enable、disable或static，这里的 static 它是指对应的 Unit 文件中没有定义[Install]区域，因此无法配置为开机启动服务。**

**PS：启用服务就是在当前"runlevel"的配置文件目录`/etc/systemd/system/multi-user.target.wants`里建立`/usr/lib/systemd/system`里面对应服务配置文件的软链接，禁用服务就是删除此软链接，添加服务就是添加软连接。**
