# Quest 01. 리눅스와 친해지기

## Introduction
* 이번 퀘스트를 통해 리눅스의 기본적인 구조와 기능에 대해 공부할 수 있습니다.

## Topics
* 리눅스의 기본 커맨드
  * `cd`, `pwd`, `ls`, `cp`, `mv`, `mkdir`, `rm`, `touch`, `ln`, `echo`, `cat`, `tail`, `find`, `ps`, `kill`, `grep`, `wc`, `df`, `du`
    * `ln`, `unlink`: symlink 관리
    * `tail`: 마지막 10줄(로그 확인?)
    * `kill`: SIGKILL(9), SIGTERM(15), SIGSTOP(24)
  * 파이프(`|`) 문자
    * `ps`: 프로세스 확인
      * `ps aux | pgrep sysmond`
  * Permission indicator: (-d) file/directory, (rwx) read-write-execute
    * chmod: 2진법
* 리눅스의 기본적인 디렉토리 구성
  * `/bin`, `/usr/bin`, `/boot`, `/dev`, `/etc`, `/home`, `/lib`, `/mnt`, `/proc`, `/root`, `/sbin`, `/usr/sbin`, `/tmp`, `/usr`, `/var`
    * `/bin`, `/usr/bin`: essential binaries
    * `/boot`: boot files
    * `/dev`, `/mnt`: device mount. `/dev/null`을 아는가?
    * `/etc`: configuration files
    * `/home/leta`: home directory
    * `/lib`: essential shared libraries
    * `/opt`: optional packages
    * `/proc`: kernal, process files
    * `/sbin`, `/usr/sbin`: system administration binaries
    * `/usr`, `/var`
* 쉘과 환경변수와 퍼미션
  * sh, bash, zsh
  * `.bash_profile`, `.bashrc`, `.zshrc`
  * `env`, `set`, `unset`, `export`
  * `chmod`, `chown`, `chgrp`
  * setuid, Sticky bit
  * `#!/bin/zsh`, `#!/usr/bin/python3`: shebang
    * Python을 shell script로 활용하기: `os.system()`로 기본 셸 스크립트 실행(현재 zsh)하고 error code를 반환한다. (성공시 0)
    * `subprocess.run()`이 권장되는 방식이며, 토큰을 string list 형태로 전달한다.
      * `returncode`
      * `stdout` 패러미터 설정가능(`PIPE`, `DEVNULL` 등) `/dev/null`로 보내면 표시되는 내용을 전부 날려버릴 수 있다.
        * `PIPE`는 파이프나 리디렉트의 역할.
        * `input`에 리디렉트용 값 넣기
      * `text=True`로 stdout/stderr를 string으로 받아 온다.
    * `from subprocess import Popen`으로 좋은 라이브러리를 갖다 쓸 수 있름. Popen은 기본적으로 Object 별로 subprocess를 생성하여 `wait()` 등을 활용한 비동기 작업을 수행할 수 있음. `poll()`로 exit code를 확인할 수 있다. (또는 `None`)
      * `asyncio`, `thread`와 비교하여 차이점은? 이 둘의 활용법은?
      * `communicate()`에 `PIPE`에 유입시킬 값을 넣을 수 있다. `output, errors`로 받는다.
* 운영체제의 기초
  * 프로세스와 쓰레드
  * 파일 시스템
* 리눅스의 배포판
  * Ubuntu, Debian, Redhat Enterprise, CentOS, Gentoo, Amazon Linux
  * 패키지 시스템: `apt`(.deb), `yum`(.rpm)
* vi
  * `i`, `w`, `q`, `u`, `d`, `p` 명령

## Resources
* [The Linux command line for beginners](https://ubuntu.com/tutorials/command-line-for-beginners#1-overview)
* [The Linux Directory Structure, Explained](https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/)
* [Unix / Linux - What is Shells?](https://www.tutorialspoint.com/unix/unix-what-is-shell.htm)
* [zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
* [About systemd](https://www.infoworld.com/article/2832405/what-is-systemd-and-why-does-it-matter-to-linux-users.html)
* [About linux distributions](https://thebloggingpot.com/2018/05/23/different-linux-distributions-explained/)
* [RPM and YUM package management](https://developer.ibm.com/technologies/linux/tutorials/l-lpic1-102-5/)
* [File editing with vi](https://developer.ibm.com/technologies/linux/tutorials/l-lpic1-103-8/)

## Checklist
* 리눅스의 파이프 문자는 어떤 역할을 하나요?
* 리눅스의 셸은 어떤 역할을 하나요? bash와 zsh는 어떻게 다른가요?
* 리눅스의 권한 체계는 어떻게 이루어져 있나요?
* 프로세스와 쓰레드는 무엇인가요?
* 현재 실행되고 있는 프로세스들 중 PID가 1인 프로세스는 어떤 역할을 할까요? init과 systemd는 무엇이고 어떻게 다른가요?
* 파일시스템이란 무엇일까요? 어떤 것이 있을까요? 지금 다루는 운영체제는 어떤 파일시스템을 쓰고 있나요?
* 리눅스의 배포판이란 무엇일까요? 여러 가지 배포판들은 어떻게 생겨났을까요?
* 리눅스의 패키지 시스템이란 무엇일까요? 이러한 시스템이 생긴 이유는 무엇일까요? deb과 rpm은 어떤 차이가 있을까요? RPM이 있는데 yum과 같은 시스템이 나온 이유는 무엇일까요?
* vi는 어떤 에디터인가요? vi와 vim은 어떻게 다를까요? vi는 왜 모든 리눅스의 기본 에디터가 되었을까요?

## Quest
* 인스턴스 생성
  * t3.nano 등급으로 EC2 인스턴스를 생성해 봅시다! Amazon Linux 2, Ubuntu 두 가지를 각각 생성해 봅니다.
  * EC2 생성 과정에서 .pem 파일이 하나 생기는데, 이는 저에게 슬랙을 통해 공유해 주시면 됩니다.
  * 세 배포판은 어떻게 다른가요?
* 리눅스 연습
  * Amazon Linux 2 인스턴스에서 위의 Topics의 기본 커맨드를 연습해 봅니다.
  * 리눅스의 기본 디렉토리들에 어떤 정보들이 있는지 둘러 봅니다.
  * zsh를 설치하고 `.zshrc` 파일을 포함해 여러 가지 설정을 해 봅니다.
  * Topics의 환경변수나 퍼미션 관련 커맨드를 연습해 봅니다.
  * 현재 실행되고 있는 프로세스들과 마운트 된 파일시스템들을 확인해 봅니다.
  * vi를 열어 여러 가지 기본 명령과 간단한 편집 방법을 연습해 봅니다.
* 생성한 인스턴스 중 Ubuntu는 완전히 종료(Terminate)하고, Amazon Linux 2는 일단 꺼둡니다.

## Advanced
* 리눅스 외의 POSIX 호환 운영체제에는 어떤 것들이 있을까요? 그러한 운영체제들은 어떤 용도로 쓰일까요?
* 윈도우를 제외하고, 최근에 발표된 운영체제들 중 POSIX에 호환되지 않는 운영체제도 있을까요?
