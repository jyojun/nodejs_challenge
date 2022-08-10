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

## 학습 메모