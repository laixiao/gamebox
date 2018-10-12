
# 集成流程

1.联系盒子方获取：唯一标识；

2.按照规范修改相关的 **文件夹** 和 **文件名**；

3.按照规范修改自己的 **代码** ；

4.把源码打包压缩发过来。



# 技术规范

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


### 二、接口命名规范（强制）:

- **使用说明：** sdk已经自动为游戏添加了唯一标识，开发者只需集成并使用；开发者需要改动的地方可能就是把wx.xxx()方法改成sdk.xxx()

- **使用方法：** [sdk接入流程](https://laixiao.github.io/gamebox/doc/sdk-doc "sdk接入流程")

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

- 禁止使用常驻节点：为保证盒子性能，盒子内的所有子游戏不能设置常驻节点。

- cocos creator引擎版本要求：2.0.2及其以上。

- 统一设计分辨率： 750*1334

- 版本号规范（必须有两个点）：1.0.0

- 子域和主域都必须遵守本规范

