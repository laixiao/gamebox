[文档首页](https://laixiao.github.io/gamebox/doc/gamebox "文档首页")
# 盒子技术规范

### 一、文件命名规范：

**1.使用方法:** 

> 唯一标识 + xxx

**2.使用范围:**
- 场景文件（强制）
- js或ts文件（强制）
- 图片文件
- 声音文件
- 字体文件
- 粒子文件
- 预制体文件


**3.使用示例：asset目录结构（唯一标识：abc）**

![](https://laixiao.github.io/gamebox/doc/gamebox.png)

### 二、其它规范（强制）：

- 禁止使用碰撞分组：您可以使用碰撞标签（tag）来区分碰撞体。

- 禁止使用常驻节点：为保证盒子性能，盒子内的所有子游戏不能设置常驻节点。

- cocos creator引擎版本要求：2.0.2及其以上。

- 统一设计分辨率： 750*1334

- 版本号规范（必须有两个点）：1.0.0

- 子域和主域都必须遵守本规范

- 禁止使用代码分包加载

- 使用wx相关api时，请判断一下运行环境： 
```javascript
if (cc.sys.platform === cc.sys.WECHAT_GAME) {}
```

------

### 三、对照表：

| 游戏名    |  唯一标识 | 
| ----------| --------- |
|  主盒子    |  aa | 
|  飞刀      |  ab |    
|  测试      |  ac |  
|  合成游戏   |  ad |  
|  羊羊对碰   |  ae |   
|  教师大战   |  af |     
|  斗兽棋     |  ag |   
|  动物与水果 |  ah |   
|  酷跑 |  ai |   
|  大话骰 |  aj |
|  口红机 |  ak |
|  极品飞车 |  al |
|  xx |  am |
|  xx |  an |

> 单机版（ 加_ ）：  如"飞刀"唯一标识为： ab_

测试账号:

| uid            |  sig      |
| ----------     | --------- |
|  wx_robot_2    |   eJxNjFtPwjAYQP-LXjWm7VaWmfAAMhkGMycVkZdmWwt*kl1sa3cx-neXBaKv5*Scb4etNzdpnldfpeGmq6Vz6yDnesQgZGngAFINsGm5qrLKcHK2aV2D4KnhrhL-Ii1OfFQDwx5CmPrUC85StjUoydODGZ*YUkoQuqRWKg1VOQgyZJi4CP1JA4UcE88lAXXxZanhOODHMLlbRXHsq08Pl4G-XHTvwO7FjIbJMm*P7KNviof4ZJ-2Fj9P*hnMo7esfl1shd5lndTJOpxshY2udMewj-qCzV-0Ktgr6*6a6dT5*QVpxVpl      |  
|  wx_robot2_    |   eJxNjdFOgzAYRt*F2xkthTow8QJZhRnUxeFCFpOm0sL*sLUNdAxjfHcJ2aK35*R837eTZ*trXpb6qCyzX0Y6dw5yriYMQioLFch2hKeBtfpTW8zOlhsDgnHLvFb8izrRsEmNzPURcsmc*OFZysFAKxmv7LTpEkIwQpe0l20HWo0Cj5mLPYT*pIWDnBLfwyHxCLn8QT3iZ-oeL6MCwj0VzWOVoryhNl9s*jhQxNdZmSWrWxl4y0WS10OwjoBGptjut4C7RL583Mjd6ZCmfFbHq1c*f0jSzZM4Fjtquv5tpvS98-MLivtZyQ__      | 
|  wx_robot_0    |   eJxNjdFOgzAARf*FV422tM3At4XBBnOZOiUsMWloabERCyllYzH*uw2RuNdzcu799l4fD3cl5*2gLbWXTngPHvBuJ6wqoa2SShgHzyM1LWstnW3ZdaqipaXIVFdRX33SSTkGMQCQLAgO-6QYO2UELaWdNiEhxAdgTk-C9KrVTvgugz4C4F9a9SWmBCM-JGgRzH*qdngXH6P0OZJ2E7J*PfoBCzjbru0qOpAmvmm2SDM*yAGzrEhGka-q9GOZvsT4LJ5Ynb-fF8tsnySZbJpdwZW4SAPfss3QnXIdaMT33s8vsT1aow__      | 
|  wx_robot0_    |   eJxNjVFPgzAURv8Lrxq9hVaHb9sEh0EdYWZbsqQpo4wbEbpSEbL4323IFn09J*f7Ts4qTm-Eft981YabQUnnwQHnesSYy9pggVJb*N1z3WSNAX62QinMuTDc0-m-qM0-*KgsIxSAsHtG-bOUvUItuSjMuEkYYy7AJe2kbrGprXBtRlwP4E8a-JRjQj3XZxS8yx8eLH4JtvMomaeg7xb*Ew27zSyMCrnKKsAgxkw3R1pqObDMfSvoNoRpVE6XSRUsKzPRbbyuuhJTcZh1-fvudrMIyuSVHP3oUU1CeKZXg-PzC5iNWa8_      | 
|  wx_robot1_    |    eJxNjV1vgjAYRv8Lt1u2flA3lngjOKabWYygaJY02FZ4h4OmVBSX-fcRotluz8l5nm8nelvcpUJUh9Jy22rlPDnIue0xSFVa2IEyHTyeuKm2lcX8YlOtQfLUcmrkv6iWBe9Vx7CLEGYPzPUuUp00GMXTne03MWOMIHRNG2VqqMpOkC7DhCL0Jy18qT5x6SNGyHOvf5B1eDaO-ck8CBam3Uo2z2dEhMsXCeZ5fyOm8bvIzREdlsKHtR4kiYizSRZsIh1OX6NV2Pphgc*jsBhtvPxc7z*bsWiA0qT4uPfIIKHrofPzC9JXWm4_     | 
|  wx_robot_1    |    eJxNjVFPgzAURv8Lz8bc29IJvuE0c1PJYIvRvTQMyiistJYyMcb-LiFb9PWcnO-79rbPm*ssz3XfOu6*jPBuPfCuJiwL0TpZSmFH*Dlwq-facTzbzBhZ8Mxxaot-UVc0fFIjQx8A2Q3zw7MUg5FW8Kx00yYyxgjAJT0J20ndjoKMGRIK8CedVGJKfBogILDLnzyM*OXhfb5M7kWtN-mO1s1qdwjaIYhndelSk5SqJxHtYZF87Cu1PiJGyyqKwxpa4u5cOM8HUT2*ahIOp9WbAjXT6yp9wrRrjv0CVOz9-AJyfVpa     | 
|  wx_robot3_    |   eJxNjdFOgzAYRt*FW4z529LgTHaBQMI2XSBo2LxpKnSzMqDrCkON725DtujtOTnf9*08P*a3vCy7vjXMfCrh3Dvg3ExYVqI1cieFtvA8Mt29dYawi*VKyYpxw4iu-kWnqmaTsgx5AIj61JtdpBiV1ILxnZk2EaUUA1zTQeiT7ForsM0QJgB-0shGTIlH7hAgRK9-cm-xU5yFixAdo1kNzbvrpgms43zZvOzJ*LoM9NbH3M2LrzRaHD78og7kg4r9VV3SAaqxWZlk01PsFyFsjmV-SKP4PKy3ZRYGaeJl87nz8wsC71h*      | 
|  wx_robot_3    |   eJxNjV1PgzAYRv8LtxhpgWbDxAvEzYG4yMf8CkmDUNg7I8VSt06z-76GbNHbc3Ke59fI4*yyrCr*3Ukq9z0zrgxkXIwYatZJaIAJDXeKCv7OJXVOtux7qGmpgaj-RUP9QUelGXYRwmRCXO8kmepBMFo2ctzEhBAboXO6ZWIA3mlh6wzbDkJ-UsInGxPXmWKEbXL*g1bjh9kqCJNbNsAdLzfLt8Ia8uR*vXBWnYINL6zX4FklLbgvYSyevjITDX7Y3gThcuF56d7MftbTNJqxxzifT5KA*ZGKnKby03o7bwoLme21cTgCbtJaIQ__      | 
|  wx_robot_4_   |   eJxNjVtPgzAARv9Ln4229IL4BmwGBmicc8bFpGFrJ8VASem4aPzvErJFX8-J*b5vsEmfr-PDQZ9qy*3YSHAHILiasRKytuqopJlgP3Cj99pyws86bxoleG45NuJf1YpPPquJIQIhoi4l3lnKoVFG8vxo51FEKXUgvKSdNK3S9SScKUMOhvBPWlXJOSH4FkGE2eVPfUw4W76F8VO47ocvoXXX2qAUbPdiGSuixJzSccXcMcBlElXVQ58Rz48LP33NFltEUN3dB2v7frOiRRP04bYM-DjBbrTYKeWRjbt-LJbg5xdAm1n9      | 
|  wx_robot4_    |   eJxNjV1PgzAYRv8LtzP6FiigiRdIiFl0Oiw1YkwaPsroCBRLmVXjf5eQLXp7Ts7zfFvpPTnPy1JOvWb6c*DWlQXW2YJFxXstasHVDD8MU7KQ2mVHmw*DqFiumaOqf9FYtWxRM0MuAMI*di*PkptBKM7yWi*bCGNsA5zSA1ejkP0s7DlDtgPwJ7Xo*JK4ToAAud7pT*xmvIlptL7Z5oX-JHdN01AgXrSvE5q**mh8u0imOGmDFSHqdmsmk0Io4nAsHrvNl*zKTOP2QOOwqqnZZ9nLO7X5w3NhIMrWKy*8I8G19fMLwM1aQg__      | 

