# iOS证书检测介绍

##  一、功能如下：  
1.支持在线ios证书检测  
2.支持最新版证书G3协议  
3.支持IPA包证书检测  
4.提高检测证书准确性  
5.支持多种证书状态并高亮显示  
6.支持证书掉签时间显示  
7.显示证书类型in-house或ad-hoc


## 二、使用方法：
1.首先搭建web服务器  
2.获取证书检测源码  
3.配置web配置文件  

例：  
这里以nginx服务器为例：  

server {  
  listen 80;  
  server_name www.example.com;  
  root /opt/p12certcheck;  

  location / {  
	index  index.html index.htm index.php;  
    }  
}   
说明：  
server_name 这个字段域名根据自已实际情况填写.  
root 这里填写网站源码根路径。  

访问链接：  
http://www.example.com;  

## 三、效果展示：  
![](https://github.com/Forever18/p12certcheck/blob/main/static/pack/checkcert/images/p12.png)  

![](https://github.com/Forever18/p12certcheck/blob/main/static/pack/checkcert/images/ipa.png)  

