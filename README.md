# Day13

## 체크 포인트
- 응용 계층 (Application Layer)
  - [x] From 주소, to 주소, title, 첨부 파일 내용을 표현 계층에 넘겨준다. 
## 학습 메모

- base64 인코딩
  - 아스키코드표 매핑
  - 2진수로 변환(8비트에 맞게 표현)
  - 6비트 단위로 자르기
  - 10진수로 변환
  - base64 테이블 매핑
  - 패딩 연산(원본의 비트수 % 3 만큼 =를 붙임)