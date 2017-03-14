@echo off
call cd D:
call cd D:\ANKA\JS\workspace\gooflow\gooflow0.8
call fis3 server clean
call fis3 release
call fis3 server start -p 8002
call fis3 release -wL
