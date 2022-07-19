# Day2

## 체크 포인트 (해야 할 일)

- [x] 가상환경 설치

![Untitled](Day%202%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%205273d592436c4d6b95369d57d29dcc2d/Untitled.png)

- [x] ssh 접속 설정

```shell
# ubuntu 가상환경
sudo -s # root로 전환
apt-get install ssh # ssh 설치
apt-get ssh start # ssh 서버 시작
service ssh status # 서버 상태 확인
```

- 우분투 가상환경에서 새로운 계정 및 비밀번호 생성

```bash
sudo adduser <새로운 유저네임>
```

![Untitled](Day%202%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%205273d592436c4d6b95369d57d29dcc2d/Untitled%201.png)

[https://zyari.tistory.com/25](https://zyari.tistory.com/25) - ssh 연결

```bash
sudo apt-get install net-tools # ifconfig ip를 확인하기 위함
```

```bash
# 로컬 컴퓨터에서 ssh 접속
ssh <hostname>@localhost -p 2222 # 포트번호 설정
```

![ssh 접속을 위한 포트번호는 2222번으로 설정 ](Day%202%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%205273d592436c4d6b95369d57d29dcc2d/Untitled%202.png)

ssh 접속을 위한 포트번호는 2222번으로 설정

- local 컴퓨터에 ssh로 ubuntu 서버 접속 및 로그인

![Untitled](Day%202%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%205273d592436c4d6b95369d57d29dcc2d/Untitled%203.png)

- [ ] root 경로에 monitoring 디렉토리 생성, 접근권한 변경
- [ ] node.js 설치 및 Day1 js파일 실행

## 학습 메모
