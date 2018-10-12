# 前言

> 为了避免数据冲突以及更好地整合游戏盒子，请遵守以下规范

# 规范内容

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


**3.使用示例：asset目录结构**

![](https://laixiao.github.io/gamebox/doc/gamebox.png)

### 二、接口命名规范（强制）:

- **使用方法：** 下载SDK文件夹，拖到项目中。

- **使用范围：** 开放数据、开放数据域、数据存储
    
- **使用示例：**
    ```javascript
    微信开放数据：
        //存
        var DataList = new Array();
        DataList.push({key:"score",value:"520"});
        sdk.setUserCloudStorage({
            kvDataList: DataList,
            success: function(res){
                console.log(res)
            },
            fail: function(res){
                console.log(res)
            }
        })
        //取
        sdk.getUserCloudStorage({
            keyList: ["score"],
            success: function(res){
                console.log(res)
            },
            fail: function(res){
                console.log(res)
            }
        }
    微信开放数据域：
        //发送
        sdk.postMessage("hello")
        //监听
        sdk.onMessage((d)=>{
            console.log(d)
        })
    数据存储：
        //存
        sdk.setItem("nick","hello")
        //取
        var nick = sdk.getItem("nick")
    ```
  


### 三、其它规范（强制）：

- 禁止使用碰撞分组：您可以使用碰撞标签（tag）来区分碰撞体。

- cocos creator引擎版本要求：2.0.2及其以上。

- 为保证盒子性能，盒子内的所有子游戏**不能设置常驻节点**。

# 集成流程

1.联系甲方获取：唯一标识；

2.按照规范修改相关的 **文件夹** 和 **文件名**；

3.按照规范修改自己的 **代码** ；

4.把源码打包压缩发过来。
