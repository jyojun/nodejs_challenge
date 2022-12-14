# Day17

## 체크 포인트
- [x] waiting, cooking queue 및 1초마다 이벤트 처리(setInterval) - Manager 모듈/객체 요구사항 구현(POS 포함)
- [x] 비동기 입력받기 (readline on() 함수로 계속 입력 대기)
- [x] 1단계 단일 요리사(Chef) 모듈/객체 요구사항 구현
![Aug-09-2022 22-39-01](https://user-images.githubusercontent.com/64758931/183664226-68238a6a-ce46-48b9-b186-0293325bdff5.gif)

- [x] 2단계 복수 요리사(Chef) 모듈/객체 요구사항 구현 - 한 요리사당 2개의 요리까지 동시에 요리할 수 있음. 
![Aug-10-2022 02-15-44](https://user-images.githubusercontent.com/64758931/183715474-cfd90a2a-cf98-4706-ae62-1665d24cc8b5.gif)

- [x] 배달기사 모듈/객체 요구사항 구현 -> 고객에 상관없이 한번에 하나의 메뉴만 가능.. (한 고객의 여러 음식을 배달하지 못함)
- [x] 현재 진행중인 메뉴 제작/요리상태/배달상태 출력

![Aug-10-2022 03-46-55](https://user-images.githubusercontent.com/64758931/183737790-0450f2ab-5837-4f68-939d-162aac2ba56e.gif)


- [ ] 고객별 전체 메뉴 확인 기능 구현
- [ ] 3명 이상 요리사 스케줄링 구현

<img src="https://user-images.githubusercontent.com/64758931/183778189-9a398d05-e938-4ade-9d28-647eac3e1a41.png" width="500"/>


### 실행
```shell
node input.js
```
- 요리사, 배달원인원의 입력은 공백으로 구분한다. (3 4 => 요리사 3명, 배달원 4명)
- 주문은 고객과 음식은 ","로 구분. (A,2:3 => A고객이 2번음식을 3개 주문)
- 배달이 끝나고 5초 후 더 이상 입력을 받지 않는다.

## 학습 메모