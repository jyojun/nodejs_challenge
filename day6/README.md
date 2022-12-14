# Day6

## 체크포인트
- [x] tokenizer 생성 및 토큰화 하기 (tag open, tag close, attribute_name, operator, value) -> 문자열 하나씩 비교
  1. "<"를 만나면 tag inside 안에서 탐색
      - 띄어쓰기가 있을 경우 따로 push (attribute, oeprator, value 값 세 개)
      - "<" 앞에 temp 문자열이 있다면 그것은 text이기 때문에 먼저 push 하고 다시 저장.
  2. ">"를 만나면 tag를 닫음
      - 저장하고 있는 temp값애 "<"이 포함하면 같이 저장, 아니면 따로 저장(attribute의 value와 ">"을 토큰으로 구분)  
  3. "="이 나오면 앞에 temp에 포함되어 있는 attribute_name을 먼저 push 하고, "="를 push 한다. 
  4. 나머지 경우 그냥 temp 문자열을 계속 저장. 
  
  
![image](https://user-images.githubusercontent.com/64758931/180793317-448457d4-f732-4010-8ed1-57f8d266b1f1.png)

- [x] lexer 생성
  1. "<", "/> 을 모두 포함하면 start_with_end로 저장.
  2. "</" 으로 시작하면 end_tag_start (태그를 닫기)
  3. "<" 로 시작하면 tag_start
  4. ">" 만 있다면 tag_end
  5. "=" 은 operator
  6. operator 전이라면 "attribute_name"
  7. oeprator 후라면 "attribute_value"
  8. 나머지는 text로 처리한다. 

![image](https://user-images.githubusercontent.com/64758931/180793473-af98823a-a545-4a8e-8b3c-590042bcc003.png)


- [x] praser 생성
  1. tag_start일 경우 key값 element, attributes, children, text 를 담고있는 object 생성후 stack에 push 한다.
  2. attributes name, attributes value가 나올경우 stack의 top attributes 배열에 정보를 push해준다. 
  3. end_tag_start("/>")일 경우 stack에 pop을 한 정보를 갖고, 스택에 정보가 있다면, 그 노드의 children 배열에 push를 하고, 빈 값일 경우 result 결과 값에 저장을 해준다.  

- [x] stringify 생성
  1. 주석은 생략
  2. "<"로 시작하는 토큰들(tag_start, tag_end)만 살펴본다.
  3. 한 토큰이 끝에 <로 시작해서 /> 로 끝나면 그냥 넘어간다.
  4. / 를 포함하지 않으면 스택에 push
  5. / 를 포함하는데 stack의 top과 현재 Token 이름과 같다면 넘어가고 아니면 Error 출력
  6. / 를 포함하는데 stack이 비어있다면 Error 출력 

#### 실행결과 
![스크린샷 2022-07-25 오후 10 28 52](https://user-images.githubusercontent.com/64758931/180790963-c81ba16f-f949-4368-af7a-37289fb0dd1f.png)

![image](https://user-images.githubusercontent.com/64758931/180818520-53d42b9c-8375-4dd4-8a0d-90bbb0b640bd.png)


- [x] elementByAttribute 생성 
  1. parsing한 obj를 parameter로 받아, attributes key로 접근하여 name, value가 있으면 그 obj를 리턴
  2. 없다면, children key로 접근하여 children의 element들을 elementByAttribu†e함수의 파라미터로 받아 리턴한다.

![image](https://user-images.githubusercontent.com/64758931/180823995-77a26f7a-420b-47e5-9aa1-d2484f211df6.png)

- [x] elementByTag 생성
  1. elementByAttribute와 동일한 알고리즘이지만, 먼저 전역변수로 빈 array를 생성하고, tag name과 일치 한다면, 해당 obj를 array에 push해준다.

![image](https://user-images.githubusercontent.com/64758931/180830648-f780d7f0-a03f-4b01-a295-afdc4aeb37b1.png)
-> 예시의 img 태그 안에 p 태그를 하나 더 추가하여, 2개가 push 되도록 하였다.

- [x] findXPath 생성
  1. 정규표현식과, split으로 path 경로를 array에 저장.
  2. path 길이가 1이 될 때 까지 slice로 앞부분을 자르며 경로에 맞게 탐색
  3. 마지막 path에서 태그 명과 일치하는 element를 result에 모두 저장
  4. result[인덱스-1] 을 리턴한다. 
  5. 인덱스-1 만큼의 번호가 없을 때, 경로를 탐색할 때 해당 태그명이 없을 경우 에러를 출력
  
![image](https://user-images.githubusercontent.com/64758931/180852664-02cb911c-7e18-489c-959a-5b61d58e14d0.png)

## 학습 메모
#### tokenizer
  - 어떤 대상의 의미있는 요소들을 토큰으로 쪼개는 역할 -> 토큰은 "어휘 분석의 단위"를 뜻하며, 이 단위는 보통 "의미있는 단위"로 정한다.
#### lexer 
  - Tokenizer에 의해 쪼갠 토큰들에게 의미를 분석하고 부여한다.

#### Lexical Analysis
  - 위 Tokenizer + Lexer의 두 가지 역할을 합한 것이 어휘분석(Lexical Analysis)라고 한다. 


#### Parser 
  - 어휘 분석을 마친 데이터들을 구조적으로 표현한다. 구조적으로 바꾸면서, 데이터가 올바른지 검토하는 메소드도 수행한다.(이번 과제의 stringify())
  - Parser에 의해 도축된 결과가 아래 예시와 같이 AST의 모습을 보인다.
```

// array parser 예시 
입력값 : [1, [2,[3]], "he is tall"]


토크나이저 결과 

[ "1", "[2,[3]]", "['he', 'is', 'tall']"]

렉서 결과 

[
	{type: 'number', value:"1" },
	{type: 'array', value: "[2, [3]]"},
	{type: 'array', value: "['he', 'is', 'tall']"},
]

파서 결과  

{
	type: 'array',
	child: [
		{type: 'number', value:'1', child:[] },
		{type: 'array', 
			child: [
			{ type: 'number', value: '2', child:[] },
			{ type: 'array', 
				child:[ {type:'number', value:'3', child:[]}
			]
		}]
		},
		{type: 'array', 
			child:[
			{ type: 'string', value: 'he', child:[] },
			{ type: 'string', value: 'is', child:[] },
			{ type: 'string', value: 'tall', child:[] },
			]
		}]
}
```

link: https://gobae.tistory.com/94