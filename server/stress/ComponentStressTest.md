# Stress Test Summary

## GET Request

### Artillery Configuration
```yml
config:
  target: 'http://localhost:3007'
  phases:
    - duration: 120
      arrivalRate: 5
      rampTo: 250
    - duration: 120
      arrivalRate: 250
scenarios:
  - flow:
    - get:
        url: "/api/related/{{ $randomNumber(1, 10000000) }}"
```

### Stress Test Results
```
All virtual users finished
Summary report @ 19:26:47(-0700) 2019-03-10
  Scenarios launched:  45401
  Scenarios completed: 45401
  Requests completed:  45401
  RPS sent: 179.64
  Request latency:
    min: 2.3
    max: 17392.3
    median: 10.5
    p95: 16500.6
    p99: 17149.9
  Scenario counts:
    0: 45401 (100%)
  Codes:
    200: 45401
```

## POST Request
### Artillery Configuration
```yml
config:
  target: 'http://localhost:3007'
  phases:
    - duration: 120
      arrivalRate: 5
      rampTo: 200
    - duration: 60
      arrivalRate: 200
scenarios:
  - flow:
    - post:
        url: "/api/related/{{ $randomNumber(1, 10000000) }}"
        json:
          relId: "{{ $randomNumber(1, 10000000) }}"
          prodName: "{{ $randomString() }}"
          avgReview: "{{ $randomNumber(1, 5) }}"
          price: "{{ $randomString() }}"
          isPrime: false
          reviewCount: "{{ $randomNumber(1, 250) }}"
          thumbnailImage: "{{ $randomString() }}"

```

### Stress Test Results
```
All virtual users finished
Summary report @ 19:51:23(-0700) 2019-03-10
  Scenarios launched:  24248
  Scenarios completed: 24248
  Requests completed:  24248
  RPS sent: 133.94
  Request latency:
    min: 2.3
    max: 796.2
    median: 3.6
    p95: 371.7
    p99: 479.8
  Scenario counts:
    0: 24248 (100%)
  Codes:
    201: 24248
```