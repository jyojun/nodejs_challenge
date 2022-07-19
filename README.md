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

- [x] root 경로에 monitoring 디렉토리 생성, 접근권한 변경
- 일반 계정에 sudo 권한 부여 (일반 계정은 sudoers에 포함되어있지 않기 때문에, 관리자가 /etc/sudoers #파일에 일반계정을 입력하고, 허용할 권한을 주어야 한다.

```bash
# 관리자 계정으로 설정
visudo -f /etc/sudoers
```

![image](https://user-images.githubusercontent.com/64758931/179698755-bcb5640b-c399-4887-99b8-4e826b25d142.png)

- 다음과 같이 sudo -i를 통해 root 권한을 얻었다.
  ![스크린샷 2022-07-19 오후 4 21 02](https://user-images.githubusercontent.com/64758931/179698827-c78f2008-3793-4892-a11f-c5233745b533.png)

- /monitoring 디렉토리를 설정 한 후, chmod로 접근 권한을 변경한다.

```bash
mkdir /monitoring # root 경로에 monitoring 디렉토리 생성
cd / # root 경로
chmod 764 monitoring

# 가상환경에서 확인
ls -al # monitoring 의 접근 권한 확인
```

![image](https://user-images.githubusercontent.com/64758931/179698989-2296abbf-acb5-4a25-abe0-6da9a066165f.png)

- date 출력

![image](https://user-images.githubusercontent.com/64758931/179699032-cae219c3-6674-485b-99b4-9a836b5a833d.png)

- [ ] node.js 설치 및 Day1 js파일 실행
- curl 설치 - curl은 서버와 통신할 수 있는 커맨드 명령어 툴이자 웹개발에 많이 사용되는 오픈소스이다. 우분투 가상환경에 curl을 설치한다.

```bash
sudo apt-get install -y curl
```

- nodejs 설치 - 우분투 apt 패키지에 들어있는 Node.js를 설치한다.

```bash
sudo apt install nodejs
```

- 버전 확인

```bash
nodejs -v # 12.22.9 version
```

![Untitled](Day%202%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%205273d592436c4d6b95369d57d29dcc2d/Untitled%208.png)

- 가상환경에 git clone(파일 복사)을 위한 apt 패키지에서 git, 그리고 NodeJS 패키지 매니저 npm도 같이 설치

```bash
sudo apt install git npm
```

- Day1의 gist를 클론을 한 뒤, 해당 폴더에 node index.js로 실행시켜준다.

![Untitled](Day%202%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%205273d592436c4d6b95369d57d29dcc2d/Untitled%209.png)

## 학습 메모

#### 파일접근 권한 설정

- 폴더 내에 있는 파일을 조회하기 위해tj ls -l 명령어를 사용한다.

- 폴더 권한을 부여하기 위해 chmod를 사용하는데, chmod [a,u,g,o][+,-,=][r,w,x] 순으로 선택하여 조합할 수 도 있고, r - 읽기 (4), w - 쓰기(2), x - 실행(1) 의 조합으로 숫자로 설정 해줄 수 있다.
- 문제에 제시된 764 권한은 소유자에게 읽기, 쓰기, 실행권한, 그룹 사용자에게 읽기 및 쓰기, 기타 사용자에게 읽기 권한만을 부여한다.

Link: https://brunch.co.kr/@jehovah/12

#### 포트포워딩

- 버추얼박스에서 가상 머신의 네트워크를 NAT Network로 하면, 호스트에서 가상머신으로 접속할 수 없다. 리눅스 OS에서 직접 명령어를 입력하는것이 어렵기 때문에 포트포워딩을 사용하여 호스트에서 SSH 접속을 할 수 있다.

Link: https://www.manualfactory.net/12089
