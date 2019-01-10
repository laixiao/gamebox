[文档首页](https://laixiao.github.io/gamebox/doc/gamebox "文档首页")
# 盒子后端接入文档

1.	由盒子方提供服务器
2.	由盒子方提供域名
3.	Cp方部署好游戏服务器把端口告知盒子方

例子：
cp方的游戏服务器ip端口：134.175.109.158:80，盒子方提供的域名：www.90wqiji.com/cp1，https访问域名，反向代理到游戏服务器，访问https://www.90wqiji.com/cp1 则转发到游戏服务器http://134.175.109.158:80。
