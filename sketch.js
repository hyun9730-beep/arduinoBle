// 소문자 (아두이노와 동일하게 입력)
const SERVICE_UUID = "19b10000-e8f2-537e-4f6c-d104768a1214"; 
const WRITE_UUID = "19b10001-e8f2-537e-4f6c-d104768a1214"; 
let writeChar, statusP, connectBtn;
let send1, send2, send3;
let circleColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // BLE 연결
  connectBtn = createButton("Scan & Connect");
  connectBtn.mousePressed(connectAny);
  connectBtn.size(120, 30);
  connectBtn.position(20, 40);

  statusP = createP("Status: Not connected");
  statusP.position(22, 60);

  // 색상 변경 버튼 추가
  send1 = createButton("send1");
  send1.mousePressed(() => { 
    circleColor = color(255, 0, 0); // Red
    sendNumber(1);
  });
  send1.size(100, 30);
  send1.position(20, 100);

  send2 = createButton("send2");
  send2.mousePressed(() => { 
    circleColor = color(0, 255, 0); // Green
    sendNumber(2);
  });
  send2.size(100, 30);
  send2.position(130, 100);

  send3 = createButton("send3");
  send3.mousePressed(() => { 
    circleColor = color(0, 0, 255); // Blue
    sendNumber(3);
  });
  send3.size(100, 30);
  send3.position(240, 100);

  // 초기 색상 설정 (기본값)
  circleColor = color(128, 128, 128); // 회색
}

function draw() {
  background(220);
  
  // 중앙에 크기 200인 원 그리기
  fill(circleColor);
  noStroke();
  circle(width / 2, height / 2, 200);
}

// ---- BLE Connect ----
async function connectAny() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [SERVICE_UUID],
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    writeChar = await service.getCharacteristic(WRITE_UUID);
    statusP.html("Status: Connected to " + (device.name || "device"));
  } catch (e) {
    statusP.html("Status: Error - " + e);
    console.error(e);
  }
}

// ---- Write 1 byte to BLE ----
async function sendNumber(n) {
  if (!writeChar) {
    statusP.html("Status: Not connected");
    return;
  }
  try {
    await writeChar.writeValue(new Uint8Array([n & 0xff]));
    statusP.html("Status: Sent " + n);
  } catch (e) {
    statusP.html("Status: Write error - " + e);
  }
}

