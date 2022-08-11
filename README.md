# Day19

## 체크 포인트
- Telnet 설치 (MAC 기준)
```
brew install telnet
```
### TCP echo Server

- telnet client로 포트 localhost:2022 접속
- client 에서 data를 전송하면 받은 데이터를 server -> client 전송 
- reuse를 위한 소켓 옵션을 지정한다. -> Node의 모든 소켓은 이미 **SO_REUSEADDR**를 설정한다.

![image](https://user-images.githubusercontent.com/64758931/184106349-53f22229-a485-4059-8a89-00056ac659e1.png)

### 챌린지 서버 만들기

- checkin
  - [x] 서버에 처음 연결할 때, checkin 요청을 보낸다.
  - [x] campId check는 client에서 진행한다. (J001-J384) -> 응답 실패 메세지 포함, 재입력
  
  ![image](https://user-images.githubusercontent.com/64758931/184178667-b9a40fc6-0daf-4c59-8456-5452d9b38eb7.png)

  - [x] checkin을 한 상태에서는 checkin을 할 수 없게 한다.
  
  ![image](https://user-images.githubusercontent.com/64758931/184178463-1c80d7a4-941b-4cbb-a441-f5c02f3574e6.png)

  - [x] 최대 4명까지 가능하고, 그 이후 다른 그룹에 할당.
  
  ![image](https://user-images.githubusercontent.com/64758931/184178330-47f6bcbf-aaba-4cc3-9621-966ea800f2ef.png)

  - [x] checkin의 응답으로 그룹 번호를 정수형으로 알려준다.   
  
  ![image](https://user-images.githubusercontent.com/64758931/184178803-22365a1a-c7ee-4121-bfb4-af4434dac0c2.png)


- checkout
  - [x] 특정 클라이언트가 checkout 요청을 보내면 checkin 했던 그룹에서 퇴장한다. -> 해당 group에서 checkout한 client를 제거한다. 


```javascript

// 해당 그룹을 찾아 그 인덱스에 해당하는 client 제거 
export function popGroup(groups, client) {
  let groupNum = client.groupNum;
  for (let i = 0; i < groups[groupNum].length; i++) {
    if (groups[groupNum][i] === client) {
      groups[groupNum].splice(i, 1);
      break;
    }
  }
}
```

  - [x] 해당 그룹에 다른 그룹이 한 명이라도 남아있다면, 누군가 퇴장했다는 것을 message로 알려준다.

![image](https://user-images.githubusercontent.com/64758931/184199598-36576a10-a8e4-4a6e-a91d-1fb3ff7dd583.png)
![image](https://user-images.githubusercontent.com/64758931/184199640-692d80ce-abef-4d14-97fc-358be44874f7.png)


## 학습 메모
- 특정 포트 죽이기 -> tcp server를 구동하다가 특정 port가 죽지 않고 있으면,

```
# 해당 포트에서 사용중인 프로세스 pid 검색
lsof -i :포트번호

# 해당 process kill
kill -9 해당PID
```
  https://88240.tistory.com/475

### TCP
Node.js 에서 제공되는 스트림 소켓을 사용하며, 연결형 소켓.

#### event
- close: 서버가 닫힌 후에 이벤트 발생
- connection: 새로운 연결이 만들어 지면 이벤트 발생
- error: 에러 발생 시 이벤트 발생, 'close' 이벤트는 이 이벤트가 발생한 후 직접 호출
- listening: server.listen() 함수 호출 후 bind되었을 때 이벤트 발생
- end: 클라이언트 소켓 세션이 끊어졌을 때 이벤트 발생
- data: 클라이언트 소켓으로부터 데이터를 수신받았을 때 이벤트 발생
- timeout: 소켓 세션이 비활성화 되었을 때 시간 초과될때 발생되는 이벤트

#### 소켓 재사용 문제 해결

https://brunch.co.kr/@dreaminz/
