# Day13

## 체크 포인트
1. 전송 계층
  - 응용 계층 (Application Layer)
    - [x] From 주소, to 주소, title, 첨부 파일 내용을 표현 계층에 전달 
  - 표현 계층 (Presentation Layer)
    - [x] base64 인코딩값 세션 계층으로 전달
  - 세션 계층 (Session Layer)
    - [x] uuid-v4 랜덤 값으로 session-id 생성 하고 전송계층으로 전달
  - 전송 계층 (Transport Layer)
    - [x] 3-way handshake 방식 연결
    - [x] 100 데이터 씩 세그먼트 네트워크 계층으로 전송 
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
