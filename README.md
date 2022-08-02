# Day12

## 체크 포인트
- init 명령어 요구사항
  - [x] 디렉토리 아래 .mit 하위 디렉토리를 만든다.
    - 오브젝트 : 디렉토리명/.mit/objects
    - 인덱스 : 디렉토리명/.mit/index
- commit 명령어 요구사항
  - [x] 해시 값으로 디렉토리 및 파일명을 선정하여 blob object 생성
  - [x] zlib으로 압축 저장.
  - [ ] objects 아래 blob 규칙과 동일 하게 tree 생성
  - [ ] tree object는 blob 마다 blob 해시값, 압축 후 파일 크기, 파일명 문자열 기록

- [ ] log 명령어 요구사항
- [ ] restore 명령어 요구사항



## 학습 메모

- fs 모듈 파일 입출력 처리
https://www.daleseo.com/js-node-fs/

- 상위 Directory 까지 한번에 생성 (fs mkdir recursive)
https://secondmemory.kr/667

### 실행
```javascript
npm start
```