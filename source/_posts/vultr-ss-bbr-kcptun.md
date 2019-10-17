---
title: 如何通过 Github gists 学习优秀的代码片段
date: 2019-04-20 18:29:10
categories: ladder
tags: 
- ss
- vultr
- bbr
- kcptun
- potatso
---

[1]:https://github.com/flyzy2005/ss-fly "ss-fly"
[2]:https://github.com/xtaci/kcptun "kcptun"
[3]:https://github.com/shadowsocks/shadowsocks-windows "shadowsocks windows"
[4]:https://itunes.apple.com/us/app/potatso-lite/id1239860606?mt=8 "potatso lite"
[5]:https://www.vultr.com/?ref=8030646-4F "vultr"
[6]:https://github.com/google/bbr "bbr"
[7]:https://github.com/skywind3000/kcp "kcp"

由于 Github gists 在国内无法正常访问，所以本文旨在快速学习Linux~~搭建 [shadowsocks](https://github.com/shadowsocks/shadowsocks) 服务(以下简称ss)~~，并利用 [bbr][6] 和 [kcp][7] 进行加速，然后在 windows/ios 设备上访问 Github gists 来学习优秀的代码片段。

**注意：本文基于你对 linux 操作系统有简单的认知和理解，所以本文并不适合纯小白**

**以下是需要用到的资源**

* 一台可访国际互联网的服务器
* ss 服务端一键安装脚本：[ss-fly][1]
* kcptun 服务端：[kcptun][2]（非必须）
* kcptun 客户端：[kcptun][2]（非必须)
* ss windows 客户端：[shadowsocks-windows][3]
* ss ios 客户端：[potatso lite][4]

## 一、 获取服务器

选购一台**廉价**的海外服务器就足够了，本文使用 [vultr][5] 提供的 vps，目前最便宜的是$3.5一个月。使用下面的推广链接可获得$50首冲赠送。

推广链接：[https://www.vultr.com/?ref=8030646-4F](https://www.vultr.com/?ref=8030646-4F)

*注意：推广活动是限时的，如果点击过去发现无效，就表示活动过期了。*

## 二、 安装ss服务端

服务端的安装方式有很多，本文选用 [@flyzy2005](https://github.com/flyzy2005) 编写的 [ss-fly][1] 一键安装脚本。

### 第一步：clone代码到本地

```
git clone https://github.com/flyzy2005/ss-fly
```

### 第二步：运行安装脚本

```
ss-fly/ss-fly.sh -i yourpassword 8080
```

其中`yourpassword`是 ss 连接密码，`8080`是端口号。

等待安装完成即可，安装完成之后服务会自动运行，并会开机自启。

如果需要修改密码或者端口，只需要**重新运行一次安装脚本**，或者直接修改`/etc/shadowsocks.json`这个配置文件。

相关操作
```bash
/etc/init.d/ss-fly start        # 启动
/etc/init.d/ss-fly stop         # 停止
/etc/init.d/ss-fly restart      # 重启
/etc/init.d/ss-fly status       # 查看状态
ss-fly/ss-fly.sh -sslink        # 查看连接
vi /etc/shadowsocks.json        # 修改配置
```

### 第三步：验证服务状态

这一步并不是必须的，而是为了检查 ss 服务是否在**正常运行**，并**能被外部网络访问**

#### 在服务器上执行
```
netstat -lntup
```
检查输出结果是否有一个被 python 监听的`8080`端口，如果有就说明 ss 服务已经启动。

#### 在本地执行
```
telnet yourserverip 8080
```
其中`yourserverip`是你的服务器 ip，如果连接成功，就表示 ss 服务已经能被外部网络访问。

如果没有`telnet`这个命令，可以在`控制面板 > 程序和功能 > 启用或关闭 Windows 功能`中勾选`Telnet Client`并安装。

如果`telnet`连接失败，可以检查以下几个方面：

1. 服务器防火墙是否开放`8080`端口（[ss-fly][1] 在安装过程中会自动配置防火墙开放`8080`）；
2. 服务器提供商的防火墙策略是否开放`8080`（[vultr][5] 默认无防火墙）；
3. 你所在的网络是否允许访问`8080`，由于一些企业的防火墙策略只允许访问常用端口，所以本文使用的是`8080`这种比较常用的端口；

## 三、 安装SS客户端

ss 客户端也有很多，本文选用 [shadowsocks-windows][3]，使用方法非常简单，填写好`服务器地址``服务器端口``密码`就可以正常使用了，记得更新PAC配置。


**到这里，ss 服务端和 windows 客户端就已经安装完成了，已经可以正常的网上冲浪了。**

如果你觉得冲浪的速度有点差强人意，那么你可以继续进行下面的步骤。

## 四、 开启BBR加速

[bbr][6] 是 [@google](https://github.com/google) 开源的一套内核加速算法，可以让你搭建的 shadowsocks 速度上一个台阶。

本文使用的`ss-fly`一键安装脚本已经集成了`bbr`的一键安装，所以我们只需要在服务器上运行以下脚本就可以开启`bbr`加速了。

```
ss-fly/ss-fly.sh -bbr
```
**注意：安装完成之后需要重启系统才能生效。**

检测`bbr`加速是否开启，可以输入以下脚本：

```
sysctl net.ipv4.tcp_available_congestion_control
```

如果返回类似以下这种**后面含有`bbr`**的内容，则说明已经成功开启了。

```
net.ipv4.tcp_available_congestion_control = bbr cubic reno
```

**到这里，你不但完成了 ss 服务端和 windows 客户端的安装，还对服务端的 ss 进行了 bbr 加速。**

这基本能满足大多数冲浪需求了，但如果你像本文一样，购买的是非常廉价而且又远在美利坚的 vps，每到晚上速度就会慢得让人接受不了，那么你可以继续下面的步骤。

## 五、 使用KCPTUN进行加速

[kcptun][2] 是由 [@xtaci](https://github.com/xtaci) 基于 [kcp][7] 协议的`golang`实现。KCP是一个快速可靠协议，能以比 TCP 浪费 10%-20% 的带宽的代价，换取平均延迟降低 30%-40%，且最大延迟降低三倍的传输效果。

**注意：使用`kcptun`会增加流量的开支**

但是对于本文中使用的 [vultr][5] vps 最低配，也就是 500G/month 的流量限制，完全能够负担。

### 下载最新版的kcptun

打开 [https://github.com/xtaci/kcptun/releases](https://github.com/xtaci/kcptun/releases) 在服务器上下载最新版的`kcptun`服务端`kcptun-linux-amd64-20xxxxxx.tar.gz`

```
# 本文使用的 v20190418
wget https://github.com/xtaci/kcptun/releases/download/v20190418/kcptun-linux-amd64-20190418.tar.gz
```

解压之后启动服务

```
./server_linux_amd64 -t "yourssip:8080" -l ":8081" -mode fast3 -nocomp -sockbuf 16777217 -dscp 46 --key yourpassword
# 这里是直接在当前服务器会话运行的，你可以使用 nohup 让它在后台运行，也可以注册成 systemd 服务让它以服务的形式启动
```

其中`yourssip`是你的 ss 服务器 ip，在本文中 ss 和 kcptun 部署在同一服务器，所以这里直接填写服务器的 ip 地址，`8080`是你的 ss 端口，`8081`是你准备让`kcptun`监听的端口，`yourpassword`是你的`kcptun`密码。

你任然可以使用`netstat -lntup`来查看`8081`端口的监听情况，以便确认`kcptun`是否启动成功

**这样，kcptun 服务端就已经部署好了**

接下来下载最新版的 windows 客户端`kcptun-windows-amd64-20xxxxxx.tar.gz`，解压之后会发现里面包含 windows 服务端和客户端文件，由于我们的服务端已经部署在 linux 上，所以我们只需要名为`client_windows_amd64.exe`的客户端文件。

我们用`cmd`运行以下脚本

```
client_windows_amd64.exe -r "KCP_SERVER_IP:8081" -l ":1000" -mode fast3 -nocomp -sockbuf 16777217 -dscp 46 --key yourpassword
```

其中`KCP_SERVER_IP`是你的`kcptun`所在服务器的 ip，`8081`是你的`kcptun`监听的端口，`:1000`是你的`kcptun`客户端准备监听的本地端口，`yourpassword`是你的`kcptun`密码。

这样我们的`kcptun`客户端就已经成功连接到了我们的`kcptun`服务端，接下来我们只需要修改一下我们的`shadowsocks-windows`客户端的配置，让`shadowsocks-windows`不把数据发送到 ss 服务器，而是把数据发送到本地的`kcptun`，就能实现我们的`kcptun`加速了。

```
#   ss客户端 -> kcptun客户端 -> kcptun服务端 -> ss服务端
```

**shadowsocks-windows 配置修改**

将`服务器地址`改为`127.0.0.1`，将`服务器端口`改为`1000`，确认之后就可以享受`kcptun`加速带来的稳定和快乐了。


## 六、整合shadowsocks-windows和kcptun客户端

到上一步的时候，由于我们在客户端每次都要开启两个程序（kcptun客户端、ss客户端），所以在使用上显得并不那么优雅。好在`shadowsocks-windows`提供了插件的支持，我们可以把`kcptun`以插件的形式加载到`shadowsocks-windows`，使得我们只需要启动`shadowsocks-windows`就可以愉快的冲浪。

1. 复制`client_windows_amd64.exe`到`shadowsocks-windows`目录；
2. 修改`shadowsocks-windows`配置，将`服务器地址`改为`ss服务器地址`，将`服务器端口`改为`8081`（服务端`kcptun`监听的端口），`插件程序`填写`client_windows_amd64.exe`，`插件参数`填写以下内容
```
-r %SS_REMOTE_HOST%:%SS_REMOTE_PORT% -l %SS_LOCAL_HOST%:%SS_LOCAL_PORT% --mode fast3 --nocomp --sockbuf 16777217 --dscp 46 --key kcptunpassword
# kcptunpassword 是你的 kcptun 密码
```

确认之后就可以享受`kcptun`加速带来的稳定和快乐了。

## 七、 IOS客户端

国区已经没有好用的 ss 客户端了，本文使用的 [potatso lite][4] 也需要在美区才能下载，关于如何切换美区，或者注册美区账号，以下提供简要的说明，避免大家踩坑~~根本没有人会浏览到我的博客，哪儿来的大家~~。

1. 需要能访问真正互联网的网络，推荐使用 [nuts](https://www.nutsvpn.com/) 的 ios 版；
2. 不要用 wifi 代理，用代理无法访问 appstore；
3. 需要一个美国身份的生成器，不要乱填，乱填无法通过验证，推荐使用 [fake name generator](https://www.fakenamegenerator.com/gen-male-us-us.php)
