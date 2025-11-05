# arduinoBle

Arduino BLE 통신을 위한 웹 애플리케이션

## 기능

- 블루투스 BLE를 통한 아두이노와의 통신
- send1, send2, send3 버튼을 통한 숫자 전송 (1, 2, 3)
- 버튼 클릭에 따른 원 색상 변경 (Red, Green, Blue)

## 사용 방법

1. `index.html` 파일을 웹 브라우저에서 열기
2. "Scan & Connect" 버튼을 클릭하여 아두이노 BLE 장치 연결
3. send1, send2, send3 버튼을 클릭하여 숫자 전송 및 색상 변경

## 파일 구조

- `index.html`: HTML 메인 파일
- `sketch.js`: p5.js 스케치 파일 (BLE 통신 및 UI 구현)
- `style.css`: 스타일시트

## BLE UUID

- Service UUID: `19b10000-e8f2-537e-4f6c-d104768a1214`
- Write Characteristic UUID: `19b10001-e8f2-537e-4f6c-d104768a1214`