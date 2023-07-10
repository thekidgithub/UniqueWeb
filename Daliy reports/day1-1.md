# Day 1 总结
## git的基本使用
之前就已经创建过github账号和本地的git库，并且学习了几个基本的命令，现在只是复习并梳理了一下。

* git add将工作区内容提交至暂存区（staged）
* git commit将暂存区的内容提交（即为一次版本更新），需要使用-m命令加上提交说明
* git switch进行分支的切换
* git merge进行分支的合并（若遇冲突，需要手动解决冲突再提交合并）
* git restore用作撤销修改（三种，直接撤销；撤销暂存区；版本回退）
* git clone将远程库的代码复制到本地
* git pull相当于git fetch加上git merge，获取远程库的更新并合并至本地分支
* git push上传本地的最新提交到远程库
* git status显示当前仓库的状态，包括已修改（但未暂存）、已暂存和已提交的文件
* git log用于查看git提交日志，可以使用--graph命令使提交日志图形化

关于三种回退方式：

1. git revert 命令用于创建一个新的提交，以撤销之前的提交。它会在当前分支上创建一个新的提交，该提交将取消指定提交所做的更改。使用 git revert 不会修改历史记录，而是通过创建新的提交来撤销先前的更改。
2. git reset 命令用于将当前分支的 HEAD 指针回退到指定的提交，并丢弃这个提交之后的所有提交。
3. git checkout 命令用于切换到历史提交，并创建一个分离头指针（detached HEAD）。通过 git checkout，可以将工作目录和暂存区还原到指定的提交状态。

使用 git commit --amend 命令修改git commit信息

使用git stash暂存工作区。如果一个分支上的工作尚未完成而又要完成另一个分支上的紧急任务，可以先用git stash暂存工作状态，待完成后使用git stash apply复原。

使用git remote来实现多个上游（远程库）的管理。

## Chrome dev tools

主要了解了Elements、Console、Source。

Elements可以查看DOM树，对基本的样式进行查看和修改

Console是控制台，可以运行小规模的JS代码，会输出错误信息等警告，可以配合进行调试代码使用。

Source显示源代码，可以设置断点来调试代码。

在控制台调试JS代码的流程可以类比C语言的调试，同样也是设置断点，跟踪变量值。

## Markdown

花了点时间了解了Markdown语法。