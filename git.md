# Git 分布式版本控制系统
git     分布式版本控制系统
github  Git 仓库,提供公共仓库和私有仓库
gitlab  可以在上面创建私人的免费仓库


将某个目录纳入git管理
git init(默认master分支)





工作区      --->     暂存区     --->      本地仓库    ----->    远程仓库
          git add .       git commit -m '描述'     git push
  git add <file1> <file2> ...
暂存区 ---> 工作区
git rm --cached

查看提交日志
git log 
查看文件内容
cat config 
删除已经提交的文件
git rm <file1> 
查询当前工作区所有文件的状态，以及当前处于哪个分支
git status
查看有哪些分支，带*标记即为当前所处分支
git branch -v 
创建分支
git branch [分支名]
切换到该分支  
git checkout [分支名]  

# 合并分支  
1.切换到接受修改的分支上  
git branch [接受修改的分支名,即被合并的分支名]
2.执行merge命令 
git merge [合并的分支名]

# 产生冲突
表现：显示当前分支内容和另一分支内容
要点：1.如果不是基于推送，必须先拉取
      2.拉取下来后如果进入冲突状态，则按照“分支冲突解决”操作即可
手动解决分支冲突:
      1.编辑文件，删除特殊符号
      2.把文件修改到满意的程度，保存退出
      3.git add [文件名]
      4.git commit -m "日志信息"
            注意：此时 commit 一定不能带具体文件名

# 克隆
git clone [远程地址]
效果：
    1.完整的把远程库下载到本地
    2.创建origin远程地址别名
    3.初始化本地库

# 拉取
git pull [远程库地址别名][远程分支名]
例如：git pull origin master
pull = fetch + merge
fetch 只是将远程库的文件下载到本地，并没有更改工作区的文件
git fetch [远程库地址别名][远程分支名]
git merge [远程库地址别名/远程分支名]   
例如：git merge origin/master




VSCode中使用git
