# Day6

## 체크포인트
- [x] tokenizer 생성 및 토큰화 하기 (tag open, tag close, attribute_name, operator, value) -> 문자열 하나씩 비교
  1. "<"를 만나면 tag inside 안에서 탐색
      - 띄어쓰기가 있을 경우 따로 push (attribute, oeprator, value 값 세 개)
      - "<" 앞에 temp 문자열이 있다면 그것은 text이기 때문에 먼저 push 하고 다시 저장.
  2. ">"를 만나면 tag를 닫음
      - 저장하고 있는 temp값애 "<"이 포함하면 같이 저장, 아니면 따로 저장(attribute의 value와 ">"을 토큰으로 구분)  
  3. "="이 나오면 앞에 temp에 포함되어 있는 attribute_name을 먼저 push 하고, "="를 push 한다. 
  3. 나머지 경우 그냥 temp 문자열을 계속 저장. 
- [ ] lexer 생성
- [ ] praser 생성
## 학습 메모
#### tokenizer
  - 어떤 대상의 의미있는 요소들을 토큰으로 쪼개는 역할 -> 토큰은 "어휘 분석의 단위"를 뜻하며, 이 단위는 보통 "의미있는 단위"로 정한다.