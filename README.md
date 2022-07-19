# Day2

## 체크 포인트 (해야 할 일)

- [x] 가상환경 설치

![image](https://user-images.githubusercontent.com/64758931/179688073-00f8e513-9a81-4765-b4d0-c5ec7d9da93d.png)

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

![image](https://user-images.githubusercontent.com/64758931/179688241-dd50f4f9-422f-4d8c-9a77-fa930f41434b.png)

[https://zyari.tistory.com/25](https://zyari.tistory.com/25) - ssh 연결

```bash
sudo apt-get install net-tools # ifconfig ip를 확인하기 위함
```

```bash
# 로컬 컴퓨터에서 ssh 접속
ssh <hostname>@localhost -p 2222 # 포트번호 설정
```

![스크린샷 2022-07-19 오후 3 19 58](https://user-images.githubusercontent.com/64758931/179688362-4d4190c6-4e17-4f31-8ab2-1d87349bfa84.png)

ssh 접속을 위한 포트번호는 2222번으로 설정

- local 컴퓨터에 ssh로 ubuntu 서버 접속 및 로그인

![image](https://user-images.githubusercontent.com/64758931/179688762-34e56293-dbfe-41bd-9e76-79b8b7cc66b2.png)

- [ ] root 경로에 monitoring 디렉토리 생성, 접근권한 변경
- [ ] node.js 설치 및 Day1 js파일 실행

## 학습 메모
