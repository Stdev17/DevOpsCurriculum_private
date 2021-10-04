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
  https://stackoverflow.com/questions/200469/what-is-the-difference-between-a-process-and-a-thread
    * 프로세스는 프로그램 바이너리가 OS 위에서 실행되기 위한 환경으로써, 프로그램의 하나의 인스턴스라 할 수 있다. 각 프로세스는 고유한 프로세스 ID, `PID`를 갖는다.
    스레드는 (해당 프로세스 내부에서) 공유 메모리 풀을 제공하고, 프로세스로 구분된 워크로드는 각자의 메모리를 갖는단 점을 들 수 있다. OS 뿐만 아니라 프로그래밍 언어에서도 거의 비슷한 개념으로 활용된다.
  * 파일 시스템
    * FS는 하드 디스크의 파티션 위에 저장된 파일들의 추상적인 레이어를 제공한다. OS는 FS를 활용하여 파일을 읽고 쓰는데, Unix에서 각 파일은 inode라는 고유한 식별자를 갖는다. 이는 아까 살펴 본 symlink와 구분된다. Unix는 각 디바이스도 모두 FS 위의 파일로써 다루며, 기록하지 않음을 의미하는 것조차 `/dev/null`로 나타낸다.
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
  * 사용자는 UNIX에서 하드웨어를 직접 컨트롤하는 Kernel과 소통하기 위해 Terminal이라는 UI에서 shell을 사용합니다. bash, zsh 류의 shell은 기본적으로 stdin, stdout, stderr 세 종류의 스트림을 갖습니다. 파이프 및 리디렉션은 선행된 커맨드에서의 스트림으로 나온 데이터를 다음 커맨드로 연결하여, 커맨드 간의 커뮤니케이션을 할 수 있도록 해 줍니다.
* 리눅스의 셸은 어떤 역할을 하나요? bash와 zsh는 어떻게 다른가요?
* 리눅스의 권한 체계는 어떻게 이루어져 있나요?
  * UNIX는 superuser(`root`)와 일반 유저로 나누어져 있으며, 이들이 `Owner`를 구성합니다. 일반 유저들은 각각 `Group`에 속하여 일부 권한을 공유합니다. 예컨데 각 파일이나 프로그램은 Owner, Group에 따라 다른 권한을 갖습니다.
  파일에 대한 권한은 읽기, 쓰기, 실행으로 나누어 구분됩니다. 각각은 2진법으로 표기되어 Owner, Group, All User가 가진 권한을 표현합니다. root 유저는 chmod로 이를 임의로 조정 가능합니다.
* 프로세스와 쓰레드는 무엇인가요?
* 현재 실행되고 있는 프로세스들 중 PID가 1인 프로세스는 어떤 역할을 할까요? init과 systemd는 무엇이고 어떻게 다른가요?
  * pid 1, launchd는 systemd에서 UNIX에 필요한 daemon 서비스들을 실행하고 관리하는 역할을 하는 아주 기본적인 프로세스입니다. UNIX에서 서비스 매니지를 담당하는 패키지로 init과 systemd가 있으며, 현대 배포판에서는 systemd로 이주해 가는 추세입니다. 
* 파일시스템이란 무엇일까요? 어떤 것이 있을까요? 지금 다루는 운영체제는 어떤 파일시스템을 쓰고 있나요?
  * macOS도 UNIX(Darwin) 기반의 운영체제로 Unix FS를 그대로 적용받음.
* 리눅스의 배포판이란 무엇일까요? 여러 가지 배포판들은 어떻게 생겨났을까요?
![](../Resources/unix_architecture.jpg)
  * Kernel 위에 각종 shell, library, application 등을 어떻게 구성하느냐에 따라 달라집니다. 모든 리눅스는 동일한 커널을 공유하며, 사용자의 니즈에 맞춰 다양한 구성을 갖춘 배포판이 개발되고 있습니다. 그 중 유료도 존재하지만, 커널은 기본적으로 GPL 라이센스입니다.
* 리눅스의 패키지 시스템이란 무엇일까요? 이러한 시스템이 생긴 이유는 무엇일까요? deb과 rpm은 어떤 차이가 있을까요? RPM이 있는데 yum과 같은 시스템이 나온 이유는 무엇일까요?
  * 리눅스 프로그램 설치와 실행을 간편하게 하기 위해 pre-built된 형태의 패키지 아티팩트를 배포받을 수 있도록 구성한 CLI 클라이언트와 미러 서버 시스템을 의미합니다. 이후 버전 관리와 의존성 관리 기능까지 제공되어 최신 소프트웨어를 쉽게 내려받을 수 있도록 발전해 왔습니다. 이것이 RPM과 yum의 주요한 차이점입니다.
  * deb은 Debian, rpm은 Red Hat 계열 배포판에서 사용하는 패키지 바이너리입니다.
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
