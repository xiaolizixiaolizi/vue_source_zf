```git
git config --global user.name "your name"
git config --global user.email "xxx@qq.com"
```

查看name  email

```
git config user.name
git config user.email
```

![image-20210125141504785](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125141504785.png)



![image-20210125141753161](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125141753161.png)

## Linux基本命令

```
mkdir xxx 新建文件夹xxx
vi aaa.txt test.js 新建/编辑文件
	i 进入编辑模式
	esc+:+wq 保存并退出
	esc+:+q! 不保存退出
cd xxx 进入xxx目录
cd ..返回上一层目录
ls 列出当前文件夹所有的文件
pwd 显示当前目录路径
cat aaa.txt 显示文件内容
clear 清空命令


```

## 工作区-暂存区-版本库-远程仓库

https://www.cnblogs.com/qdhxhz/p/9757390.html

首先简单图示一下

![image-20210125145507394](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125145507394.png)



工作区：项目文件夹 本地可见

暂存区（Stage）：介于工作区和版本区之间，是工作区到版本区的必经之路  state阶段 舞台

版本区(Repository)：己经被git版本控制了 工作区里面的隐藏文件夹目录.git.这个目录就是git的版本库

## git 命令

```
git init aaa文件夹 把aaa文件夹变为一个本地仓库（本地版本库）repository
git add xxx 将工作区xxx文件添加到暂存区 xxx可以是文件或文件夹
git status 查看状态
```



### git init aaa文件夹

把aaa文件夹变为一个本地仓库（本地版本库）repository 。在里面所有新建的文件夹/文件都是Untracked 状态。默认所有新建的文件都在工作区（这不是废话吗！常识问题） 执行git status 所有的文件都是红色

**Untracked:**  未跟踪, 此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过git add 状态变为Staged.

或者：1新建aaa文件夹 然后再aaa文件夹里面执行 git  init 自动再aaa文件夹里面生成.git文件夹

![image-20210125213149152](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125213149152.png)

### git add XXX

xxx可以是文件夹或者文件 添加指定文件`工作区workSpace到暂存区Stage`

![image-20210125151912582](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125151912582.png)

**git add .** 默认提交所有文件

### git commit -m "message" 

“” ‘’ 单双引号都可以

git commit 主要是将**暂存区里的改动给提交到本地的版本库**。每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id。

commit-id在版本回退的时候是非常有用的，它相当于一个快照,可以在未来的任何时候通过与git reset的组合命令回到这里.

![image-20210125154536245](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125154536245.png)

### git status

git status命令表示：查看文件，文件夹在工作区workSpace，暂存区Stage的状态。在git add XXX之后可以使用 （从工作区到暂存区可以用） 在git commit -m "message"从（暂存区到本地仓库）之后也可以用。

![image-20210125154146322](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125154146322.png)



### git log

查看commit的提交记录 从暂存区到本地版本库的提交记录 按q退出

**git log --stat** 查看具体的提交记录 包含了提交哪些文件

![image-20210125155859089](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125155859089.png)



### **git reflog**

git reflog 可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）

例如执行 git reset --hard HEAD~1，退回到上一个版本，用git log则是看不出来被删除的commitid，用git reflog则可以看到被删除的commitid，我们就可以买后悔药，恢复到被删除的那个版本。

![image-20210125170814757](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125170814757.png)

### 修改和删除文件

纯git操作 最容易忽视的操作是 **git add .** 

是本地工作区新增/删除或者修改，**但是同步到暂存区都要执行git add .操作** 。然后再git commit -m 'message'

![image-20210125165419748](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125165419748.png)



### git reset

git reset --sort commitID 

git reset --mixed commitID  默认

git reset --hard commitID (不建议使用 ) headA->headB(新)->commit->headA(改)->commit->headB  **新B**会保留但是**headA改**丢失。

版本回退 git reset --hard commitID     注意只有commit到本地仓库才会生成commitID

commitID 可以通过git reflog拿到

![image-20210125173801275](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125173801275.png)



修改第一期线上代码又不能加入第二期的代码，直接discard第二期代码有很可惜。这个时候需要用版本回退git reset

首先把第二期的代码commit到本地仓库。commit之后会生成commitID AAA .然后回退到第一期的代码commitID BBB。修改完bug后再head指向第二期的commitID AAA. 二期的新代码就回来了。

这个时候又会引发新的问题？commit BBB第一期修改完之后的代码，reset到第二期的commitID AAA会同步吗？其实很希望同步。

结果是不会同步的。修复bug的代码会消失。 来一个merge 操作。

### git  revert

revert 返回 恢复



## branch

```
git checkout -b dev 创建dev分支 然后自动切换到dev分支
git branch 查看本地分支
git checkout master 由当前分支切换到master分支
git merge dev 合并dev分支到当前分支
git branch -d dev 删除本地dev分支 前提：不能处于dev分支下来执行删除dev命令 
git push origin -d dev 删除远程dev分支
git diff branch1 branch2 显示两个分支所有文件差异信息
git diff branch1 branch2 --stat  显示两个分支的差异文件列表
```



### git checkout -b  branchname



git checkout -b B 从当前分支A新建并且自动切换到B B完完全全复制了一份A分支里面内容。以后修改A或者B分支内容 ，互不影响。

注意啊：这里有个大坑：如果一开始master分支里面啥文件也没有，然后执行git checkout -b XXX 这个时候 XXXbranch分支会被创建而master分支自动消失。因为master分支里面没有东西。所以需要给master分支 add commit初始化一点东西。

![image-20210125203255446](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125203255446.png)

### git checkout branchName

![image-20210125203146200](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125203146200.png)

### git branch

查看本地分支个数

git branch -a 查看本地和远程分支



### git merge branchName

A git merge branchB ;A分支合并B分支。再合并B分支之前A自己分支要提交commit或者stash（隐藏）自己的代码。不然合并不成功。



![image-20210125203728627](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125203728627.png)



### branch分支冲突

**合并分支，如果在同一个文件，同一个位置，都修改或者新增内容会引起版本冲突。**

![image-20210125204606971](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125204606971.png)



## gitlab

场景1：关联 有本地仓库，需要和远程仓库做关联。

```
git init
git add .
git commit -m 'message'
git remote add origin url(https/http)
如果关联失败 直接暴力删除本地.git文件夹，重新建立本地仓库。
或者删除远程仓库 git remote remove origin 然后重新建立关联
git push -u origin master 推送本地代码到远程仓库
```

### git remote add origin url(https/http)

**本地仓库去关联远程仓库**。origin是远程仓库url的别名。

首先得有一个待关联的远程仓库吧。得自己去gitlab上新建仓库。

![image-20210125214354820](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125214354820.png)

![image-20210125214719272](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125214719272.png)

### git remote -v

查看关联了哪些远程库

![image-20210126160140260](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210126160140260.png)

### git remote remove origin

删除远程仓库关联 远程origin仓库还在，只是删除了关联

### git push -u origin master

```
git push <远程主机别名> <本地分支名>:<远程分支名>

git push <远程主机别名> <本地分支名> 如果本地分支名与远程分支名相同，则可以省略冒号：
```

我们第一次推送`master`分支时，由于远程库是空的，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

![image-20210125220450178](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125220450178.png)



### git push origin dev

把本地dev仓库推送到远程dev仓库中，很明显远程是没有dev仓库，但是会远程自动建立dev仓库 cool

```
git checkout -b dev 本地创建一个dev branch
git add .
git commit -m 'message' 如果动了文件
git push origin dev  //把本地dev仓库推送到远程dev仓库中，很明显远程是没有dev仓库，但是会远程自动建立dev仓库 cool
```

![image-20210125221246343](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210125221246343.png)



### git pull origin master

首先有一个大前提：在pull拉去远程分支代码之前，先commit下自己本地修改过的代码操作。不然pull失败。push很少有冲突，因为push代码会把远程代码给改掉，改为和本地代码一样。pull就容易有冲突

![image-20210126144733014](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210126144733014.png)

然后这个时候很容易产生代码冲突。不过冲突很正常，

```
git pull <远程主机名> <远程分支名>:<本地分支名>
```

```
git pull origin master //远程master和本地master同名可以省略
```

git pull origin master :远程origin仓库的master分支里面有新的东西，这个新的东西是本地master仓库没有的，这个时候用git pull origin master就是把远程master仓库拉取到本地master。保持同步

注意：但是本地如果没有test分支，但是远程却有一个test分支，执行**git pull origin test**是不会把远程test分支拉取到本地的。

![image-20210126140410681](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210126140410681.png)



### git pull origin test:test 这个最保险

远程有test分支，本地没有test分支。如果需要实现本地同步有一个test分支，

```
git pull origin test:test
```

这样本地也就有一个test分支了.但是本地分支不会自动切换到test分支上 ，还需要自己git checkout test 手动切到test分支上

### git checkout -b test1 origin/test1 有时候失灵

还有一步到位的方法：git checkout -b 本地尚未有的分支 远程别名/远程已有的分支。直接拉取远程分支AAA，并且自动本地创建AAA分支然后在自动切换到AAA分支上。爽歪歪。

### git fetch 

git fetch 远程别名origin 远程master:本地temp 用的不多

拉取远程master分支这样就不会冲突了，但是需要自己切到temp分支

### git clone url(http)

本地没有仓库 获取一个完整的远程库，**克隆的是整个仓库（仓库里面可能包括很多分支）而不是克隆仓库里面的分支**

![image-20210126170120842](C:\Users\lgm\AppData\Roaming\Typora\typora-user-images\image-20210126170120842.png)



常见问题：当我clone下之后，远程仓库又新建了test2分支。而本地是不会自动更新的 需要执行 git checkout -b test2 origin/test2 然后本地就有test2分支了。





