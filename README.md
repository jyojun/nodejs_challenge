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


- mission
  - [x] 체크인 이후에는 mission 요청을 보내서 키워드를 받을 수 있다.
  - [x] 서버에서 정수형을 확인해서 키워드를 보내준다.

![image](https://user-images.githubusercontent.com/64758931/184213178-30ebbab8-8319-4e12-bf7a-5e94bd2f1224.png)
![image](https://user-images.githubusercontent.com/64758931/184213224-2952abbb-48ad-4fdf-96da-a5fcd14c4d19.png)

- peersession
  - [x] 피어세션 요청을 보내면 같은 그룹에 있는 사람들과 브로드 캐스트를 한다.
  - [x] maxCount를 정수형으로 보낸다.
  - [x] maxCount를 넘어가면 더이상 메세지를 주고받을 수 없다.

- message
  - [x] 메세지 요청을 보내면 peersession 진행중인 경우는 모두에게 브로드캐스트 되지만, 그렇지 않은 경우는 무시된다.
  - [x] 메세지 요청의 데이터는 text로 문자열을 받을 수 있다.

![image](https://user-images.githubusercontent.com/64758931/184225541-6155913b-3134-44aa-9fde-8581ad8ee59e.png)
![image](https://user-images.githubusercontent.com/64758931/184225593-5412cbcb-c795-4d00-9f54-6e7f1797473f.png)
![image](https://user-images.githubusercontent.com/64758931/184225379-8f72cda1-55eb-4efb-be81-42d438ee1d70.png)

- complete
  - [x] 피어세션 요청을 보낸 캠퍼가 complete를 보내면 피어세션을 멈출 수 있다.
  - [x] 다시 브로드캐스트를 할 수 없다.

![image](https://user-images.githubusercontent.com/64758931/184234001-7119dff8-c2df-4d57-9b15-8fe7ec921d3c.png)
![image](https://user-images.githubusercontent.com/64758931/184234042-77c79c86-eeab-4a60-9f11-5b6ce9f831df.png)
![image](https://user-images.githubusercontent.com/64758931/184234079-109f5a7a-9177-4cb2-a03c-56d2c6f5b1ce.png)

- direct
  - [x] 직접 특정한 캠퍼에게 보내는 메세지. campId, text 문자열로 입력받는다.

![image](https://user-images.githubusercontent.com/64758931/184240092-0f465be1-f236-4bcf-98b9-b11aa0cb54e3.png)
![image](https://user-images.githubusercontent.com/64758931/184240132-dc44b2b8-2f69-4bd1-8dc8-b987823d6fbf.png)
![image](https://user-images.githubusercontent.com/64758931/184240209-74b46487-342a-478d-b3b7-9343b41a379b.png)

보낸사람 끼리만 볼 수 있다.  (private message)
![image](https://user-images.githubusercontent.com/64758931/184240758-4b77f5a9-0466-491b-ae7d-548be0baaea0.png)


- 활동시간 표시
  - [x] 클라이언트는 checkin, checkout 성공한 시간 차이를 계산하여 종료하기 전에 표시한다.

![image](https://user-images.githubusercontent.com/64758931/184256825-a5f8b3f8-e00f-4065-81ec-6e9175edbe15.png)


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
