# Day9

## 체크 포인트

- 프로세스 스케줄링 시각화

  - 공통 요구 사항
    - [x] 프로세스 6개를 생성한다.
    - [x] 프로세스를 하나씩만 1초동안만 1개씩만 실행 시킨다.
  - [x] 라운드 로빈 스케줄링

    ```javascript
    const process1 = new Process("P1", 50);
    const process2 = new Process("P2", 25);
    const process3 = new Process("P3", 7);

    const RRS = new RRScheduler();
    RRS.enqueue(process1);
    RRS.enqueue(process2);
    RRS.enqueue(process3);

    RRS.start();
    ```

    실행 결과
    ![image](https://user-images.githubusercontent.com/64758931/181492967-426265ef-52a6-43a4-9b49-5a54e2247920.png)

  - [x] 고정 우선순위 스케줄링

    ```javascript
    const process1 = new Process_P("P1", 7, 3);
    const process2 = new Process_P("P2", 25, 1);
    const process3 = new Process_P("P3", 50, 2);

    const priorityScheduler = new PriorityScheduler();

    priorityScheduler.enqueue(process1);
    priorityScheduler.enqueue(process2);
    priorityScheduler.enqueue(process3);

    priorityScheduler.start();
    ```

    실행 결과
    ![image](https://user-images.githubusercontent.com/64758931/181522681-3509f329-2087-4268-b47a-d5e85cca5c95.png)

  - [x] 기한부 스케줄링

    - earliest deadline first로 구현 해 주었기 때문에, priority 와 비슷하게 구현
    - priority scheduling 과 차이점은, total 시간이 process의 deadline이 지나면 terminated(deadline missed) 상태로 변환하여, 더이상 실행시키지 않는다.

    ```javascript
    const process1 = new Process_D("P1", 50, 60); // deadline 60
    const process2 = new Process_D("P2", 25, 50); // deadline 50
    const process3 = new Process_D("P3", 7, 20); // deadline 20

    const deadlineScheduler = new DLScheduler();

    deadlineScheduler.enqueue(process1);
    deadlineScheduler.enqueue(process2);
    deadlineScheduler.enqueue(process3);

    deadlineScheduler.start();
    ```

    실행 결과 (P1 프로세스가 deadline에도 일을 끝내지 못해서 종료됨)
    ![스크린샷 2022-07-29 오전 2 08 29](https://user-images.githubusercontent.com/64758931/181597494-321b99aa-e322-468a-a45f-0efa9ae27a61.png)


    ```javascript
    const process1 = new Process_D("P1", 50, 90); // deadline 60 -> 90으로 늘려줌
    const process2 = new Process_D("P2", 25, 50);
    const process3 = new Process_D("P3", 7, 20);

    const deadlineScheduler = new DLScheduler();

    deadlineScheduler.enqueue(process1);
    deadlineScheduler.enqueue(process2);
    deadlineScheduler.enqueue(process3);

    deadlineScheduler.start();
    ```

    실행결과 (P1 프로세스의 기한을 60 -> 90으로 늘려 정상적으로 종료가 됨)
    ![image](https://user-images.githubusercontent.com/64758931/181597459-15df5948-f201-4c4d-b6df-087a02c067e2.png)


## 학습 메모

## 프로세스 스케줄링

스케줄링은 프로세스가 생성되어 실행 될 때 필요한 시스템의 여러자원을 해당 프로세스에게 할당하는 작업을 뜻함.

대기시간은 최소화 하고, 최대한 공평하게 처리하는 것을 목적으로한다.

### 스케줄링 종류

- 장기 (long-term scheduling)
  - 어떤 프로세스가 시스템의 자원을 차지할 수 있도록 할 것인가를 결정.
  - 준비(ready) 상태 큐로 보내는 작업
  - 수행 빈도가 적고, 느리다.
- 중기 (middle-term scheduling)
  - 어떤 프로세스들이 cpu를 할당 받을 것인지 결정하는 작업.
  - cpu를 할당받으려는 프로세스가 많으면 프로세스를 대기(waiting) 시킨 후, 활성화해서 일시적으로 부하를 조절한다.
- 단기 (short-term scheduling)
  - 프로세스가 실행되기 위해 cpu를 할당받는 시기와 특정 프로세스를 지정하는 작업
  - 프로세서 스케줄링, 하위 스케줄링 이라고 한다.
  - 자주 수행되고 빠르다.

### 스케줄링 상태 종류

- 생성(create) : 프로세스가 생성되는 중이다.
- 실행(running) : 프로세스가 프로세서를 차지하여 명령어들이 실행되고 있다.
- 준비(ready) : 프로세스가 프로세서를 사용하고 있지는 않지만 running 상태가 될 수있는 상태로, cpu 할당을 기다린다.
- 대기(waiting) : 프로세스가 입출력 완료, 시그널 수신 등 어떤 사건을 기다리고 있는 상태.
- 종료(terminated) : 프로세스의 실행이 종료 상태.

### 스케줄링 상태 전이도

![image](https://user-images.githubusercontent.com/64758931/181597750-14fba532-d048-4330-b072-a8e62920a7cf.png)

### 스케줄링 기법

- 선점(Preemptive) 스케줄링
  CPU가 어떤 프로세스에 의해 점유 중일 때, 우선 순위가 높은 프로세스가 CPU를 차지할 수 있다.
- 비선점(Non-Preemptive 스케줄링
  선점 스케줄링과 반대로 CPU가 어떤 프로세스에 의해 점유 중일때, 다른 프로세스가 차지할 수 없다.

