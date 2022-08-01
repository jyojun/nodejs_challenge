# Day11

## 체크 포인트
- path class 생성자 함수 
  - [x] unix 파일 경로 정규표현식으로 root, dir, name, ext 으로 나누기 
    ```javascript
    const regex = /(\/)(([a-zA-Z0-9]+\/)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)/;
    ```
  - [x] unix style lastDirectory, components, abolusteString 
  - [x] windows 파일 경로 정규표현식으로 root, dir, ext, name 으로 나누기 
    ```javascript
    const regex = /([A-Z]:\\)?(([a-zA-Z0-9]+\\)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)/;
    ```
  - [x] windows style lastDirectory, components, abolusteString 
  - [x] appendComponent() - 경로에 요소를 추가

  - [x] deleteLastComponent() - 마지막 경로를 제거한다.  
    ```javascript
    const path = new Path("/home/user/boost/camp/challenge/day17/problem.md");
    console.log(path.stringify());
    path.appendComponent("base");
    path.appendComponent("camp");
    console.log(path.stringify());
    path.deleteLastComponent();
    console.log(path.stringify());
    ```
    - 실행 결과
    ![image](https://user-images.githubusercontent.com/64758931/182191713-8b782e57-cc49-4c29-8700-bc76c551ca02.png)

  - [x] 두 개 Path 상대 경로 비교 relative() 기능 구현
    ```javascript
    const path = new Path("/data/result/test/aaa");
    console.log(path.relative("/data/result/source/bbb"));
    const path2 = new Path("/first/second/last/param");
    console.log(path2.relative("/second/most/jk"));
    ```
    - 실행 결과

## 학습 메모

### 1. 정규 표현식 문법 정리

#### Groups and ranges

| Character | 뜻                                     |
| --------- | -------------------------------------- |
| `\|`      | 또는                                   |
| `()`      | 그룹                                   |
| `[]`      | 문자셋, 괄호안의 어떤 문자든           |
| `[^]`     | 부정 문자셋, 괄호안의 어떤 문가 아닐때 |
| `(?:)`    | 찾지만 기억하지는 않음                 |

#### Quantifiers

| Character   | 뜻                                  |
| ----------- | ----------------------------------- |
| `?`         | 없거나 있거나 (zero or one)         |
| `*`         | 없거나 있거나 많거나 (zero or more) |
| `+`         | 하나 또는 많이 (one or more)        |
| `{n}`       | n번 반복                            |
| `{min,}`    | 최소                                |
| `{min,max}` | 최소, 그리고 최대                   |

#### Boundary-type

| Character | 뜻               |
| --------- | ---------------- |
| `\b`      | 단어 경계        |
| `\B`      | 단어 경계가 아님 |
| `^`       | 문장의 시작      |
| `$`       | 문장의 끝        |

#### Character classes

| Character | 뜻                           |
| --------- | ---------------------------- |
| `\`       | 특수 문자가 아닌 문자        |
| `.`       | 어떤 글자 (줄바꿈 문자 제외) |
| `\d`      | digit 숫자                   |
| `\D`      | digit 숫자 아님              |
| `\w`      | word 문자                    |
| `\W`      | word 문자 아님               |
| `\s`      | space 공백                   |
| `\S`      | space 공백 아님              |

https://github.com/dream-ellie/regex/blob/master/README.md

https://regexone.com/lesson/kleene_operators?

- jest 설치 에러
  - https://bongra.tistory.com/102
