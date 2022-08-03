# Day13

## 체크 포인트
#### 1. 전송 계층
  - 응용 계층 (Application Layer)
    - [x] From 주소, to 주소, title, 첨부 파일 내용을 표현 계층에 전달 
  - 표현 계층 (Presentation Layer)
    - [x] base64 인코딩값 세션 계층으로 전달
  - 세션 계층 (Session Layer)
    - [x] uuid-v4 랜덤 값으로 session-id 생성 하고 전송계층으로 전달
  - 전송 계층 (Transport Layer)
    - [x] 3-way handshake 방식 연결
    - [x] 100 데이터 씩 세그먼트 네트워크 계층으로 전송
  - 네트워크 계층 (Network Layer)
    - [x] source_ip, destination_ip를 첨부한 패킷을 데이터링크 계층으로 전송
  - 데이터 링크 게층 (Data Link Layer)
    - [x] MAC 헤더를 붙여 물리 계층으로 전송
  - 물리 계층 (Physical Layer)
    - [x] 전송 받은 프레임을 16진수로 저장.

#### 2. 수신 계층
  - 물리 계층 (Physical Layer)
    - [x] 전송 물리 계층에서 전달받은 16진수 바이트를 문자열로 변환해서 출력하고, 데이터 링크로 전달
  - 데이터 링크 계층 (Data Link Layer)
    - [x] 헤더를 제거하고 네트워크 계층에 전달
  - 네크워크 링크 계층 (Network Layer)
    - [x] ip 정보를 지운 세그먼트 정보를 상위계층으로 보냄
  - 전송 계층 (Transport Layer)
    - [x] 받은 세그먼트 정보중 DATA만 처리하여 합쳐 전달.
  - 세션 계층 (Session Layer)
    - [x] 세션 id 확인 후 출력
## 학습 메모

- base64 인코딩
  - 아스키코드표 매핑
  - 2진수로 변환(8비트에 맞게 표현)
  - 6비트 단위로 자르기
  - 10진수로 변환
  - base64 테이블 매핑
  - 패딩 연산(원본의 비트수 % 3 만큼 =를 붙임)
- base64 디코딩은 인코딩 반대
  https://ncanis.tistory.com/402
