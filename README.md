# Day18

## 체크 포인트
- CREATE TABLE 구문
  - [x] 테이블을 생성할 때 테이블 이름(table_name)과 동일한 CSV 파일을 생성한다. 
  - [x] 지원하는 datatype은 숫자 Numeric, String 만 지원 -> type check error
  - [x] Numeric 타입 id 칼럼을 추가
  - [x] 이미 파일이 있으면 에러 -> table already exists 

- INSERT INTO 구문
  - [x] 모든 컬럼은 not null로 가정하고 테이블에 컬럼 갯수와 일치하지 않으면 실패메세지를 표시.
  - [x] id 값은 1부터 시작해서 insert 할 때마다 자동으로 +1 하나씩 증가한다.
  - [x] 숫자는 따옴표가 없고, 문자열은 따옴표가 있어야한다.
  - [x] 성공한 경우 레코드 전체값을 출력한다. 
  - [ ] 칼럼 명이 테이블 칼럼과 일치하는지 비교

- DELETE FROM 구문
  - [x] 테이블에서 condition 조건이 맞는 레코드를 삭제. -> String 과 비교할 때 값에 큰 따옴표를 붙인다.("");
  - [x] 조건에 맞는 레코드가 없으면 실패메세지를 표시한다.
  - [x] 성공한 경우는 삭제한 레코드 전체값을 출력

- UPDATE 구문
  - [x] 테이블에서 condition 조건이 맞는 레코드에 특정 칼럼 값을 변경
  - [x] 조건에 맞는 레코드가 없으면 실패메세지를 표시한다.
  - [x] 성공한 경우는 업데이트한 레코드 전체값을 출력 

- SELECT FROM 구문
  - [x] 테이블에서 condition 조건이 맞는 모든 레코드의 칼럼을 출력
  - [x] condition 조건은 '=' 만 구현
  - [x] 레코드 갯수 표시

- DROP TABLE 구문
## 학습 메모