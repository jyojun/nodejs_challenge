# Day18

## 체크 포인트

1. SQL 데이터 관리
   
- CREATE TABLE 구문
  - [x] 테이블을 생성할 때 테이블 이름(table_name)과 동일한 CSV 파일을 생성한다. 
  - [x] 지원하는 datatype은 숫자 Numeric, String 만 지원 -> type check error
  - [x] Numeric 타입 id 칼럼을 추가
  - [x] 이미 파일이 있으면 에러 -> table already exists 
  
  
![image](https://user-images.githubusercontent.com/64758931/183991062-bdc5d04d-bb93-44c8-bf98-2e1f89a21181.png)
![image](https://user-images.githubusercontent.com/64758931/183991258-02852530-9132-4315-a909-0a478892133b.png)



- INSERT INTO 구문
  - [x] 모든 컬럼은 not null로 가정하고 테이블에 컬럼 갯수와 일치하지 않으면 실패메세지를 표시.
  - [x] id 값은 1부터 시작해서 insert 할 때마다 자동으로 +1 하나씩 증가한다.
  - [x] 숫자는 따옴표가 없고, 문자열은 따옴표가 있어야한다.
  - [x] 성공한 경우 레코드 전체값을 출력한다. 
  - [ ] 칼럼 명이 테이블 칼럼과 일치하는지 비교

![image](https://user-images.githubusercontent.com/64758931/183993653-9eaa66ab-c38f-43ee-b679-1be0a7f52da6.png)
![image](https://user-images.githubusercontent.com/64758931/183993697-83e5661b-00b4-44cb-9842-89be634ae196.png)


- DELETE FROM 구문
  - [x] 테이블에서 condition 조건이 맞는 레코드를 삭제. -> String 과 비교할 때 값에 큰 따옴표를 붙인다.("");
  - [x] 조건에 맞는 레코드가 없으면 실패메세지를 표시한다.
  - [x] 성공한 경우는 삭제한 레코드 전체값을 출력

![image](https://user-images.githubusercontent.com/64758931/183993916-118641ab-8101-4a3a-8c98-c426a3598213.png)
![image](https://user-images.githubusercontent.com/64758931/183993947-29e440c1-f06b-4465-8a5d-2ef39ef66197.png)


- UPDATE 구문
  - [x] 테이블에서 condition 조건이 맞는 레코드에 특정 칼럼 값을 변경
  - [x] 조건에 맞는 레코드가 없으면 실패메세지를 표시한다.
  - [x] 성공한 경우는 업데이트한 레코드 전체값을 출력 

![image](https://user-images.githubusercontent.com/64758931/183994219-892dde49-357d-4c3e-9943-f5e42be2c327.png)
![image](https://user-images.githubusercontent.com/64758931/183994276-83768699-f3ec-43e6-9c0a-36bd09fc9062.png)



- SELECT FROM 구문
  - [x] 테이블에서 condition 조건이 맞는 모든 레코드의 칼럼을 출력
  - [x] condition 조건은 '=' 만 구현
  - [x] 레코드 갯수 표시

![image](https://user-images.githubusercontent.com/64758931/183994795-9bc9d92d-5936-4d7f-a117-0c278e4baf64.png)


- DROP TABLE 구문
  - [x] 테이블 이름과 동일한 csv 파일 삭제 -> ulinkSync()

![image](https://user-images.githubusercontent.com/64758931/183995002-28936911-3db1-47eb-9f28-88b2bb780cdf.png)

2. 리포트와 내보내기

- REPORT TABLE 구문
  - [x] 최초 레코드는 id 값 중에서 가장 작은 값, 마지막 레코드는 id 값 중에서 가장 큰 값을 출력

![image](https://user-images.githubusercontent.com/64758931/184001564-ebb0f72d-dd6e-461a-b23e-58b6313eda12.png)


- EXPORT 구문
- IMPORT 구문


## 학습 메모