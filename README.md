# Blog

## 依赖
以`github issues`为核心的个人博客程序，核心依赖如下：

* [create-react-app](https://github.com/facebook/create-react-app) 构建基于[Typescript](https://github.com/microsoft/TypeScript)的[React](https://github.com/facebook/react)项目
* [react-apollo](https://github.com/apollographql/react-apollo) 提供的`@apollo/react-hooks`作为[Graphql](https://graphql.org/)客户端请求[Github api v4](https://developer.github.com/v4/)
* [gitalk](https://github.com/gitalk/gitalk) 利用`Github Issues`实现评论功能
* [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) 精简版`Github Markdown`样式表


## 映射

Github Issues 到 Blog 的对应关系如下：

* Milestones -> Categories
* Labels -> Tags
* 特定Assign用户的Issues -> Posts
* 特定Issue -> Page
* Issue主体 -> 博文
* Issue回复 -> 博文评论
