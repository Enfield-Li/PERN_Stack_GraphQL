 仿Reddit的一个全栈 web app (GraphQL api + ssr)
    
    (reddit 官网: https://www.reddit.com/) 

作品描述：

    仿Reddit论坛PC端功能，搭建的一个论坛式网站

Stack: 

    语言：typescript;
    前端框架：Nextjs (ssr) / Apollo Client + React Context api (state 管理) / Boostrap 5 (css)；
    APi： GraphQL；
    服务器：Express.JS / Apollo Server / Express session + Redis-server (auth) ；
    数据库：PostgreSQL / TypeORM。
    
现有功能：

    用户注册，登录（可通过用户名或邮箱），发布、删除、编辑帖子，给帖子投票、添加对帖子的反应，查看用户主页，加载更多分页。

    功能细节：
        1. 用户注册及登录：完成注册或登录操作后，用户将获取cookie，保存其登录状态，并跳转至首页，首页显示用户过往与帖子的交互状态；
        2. 发布帖子：发布帖子时，将自我投票及点赞，并跳转至该帖子的详情页面，用户可以看到自己在发布帖子时，系统自动投票和添加的交互状态；
        3. 编辑帖子：编辑好后，自动跳转至该帖子详情页面；
        4. 首页pagination：使用基于cursor的分页，显示最近时间的帖子，用户向下滑动、点击加载更多按钮可显示更多帖子，默认10个；
        5. 用户主页：显示用户过往发布的帖子，以及用户的帖子数量、用户注册日期，分页采用同样的cursor分页形式，也是显示最近时间帖子。

如何使用？

    0. cd 进入文件
    1. npm i
    2. 再分别进入server 和 client:
        npm i
    3. 更改连接数据库文件： server/utils/connectdb.ts （我用的PostgreSQL，可替换别的，后台还要运行redis-server)
    4. cd.. 回到主文件夹
    5. npm run dev
    6. enjoy :)
