/*
    Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleServer.cpp
    Ported to Arduino ESP32 by Evandro Copercini
    updates by chegewara
*/

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <string>

#include <DFRobotDFPlayerMini.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(16, 17);  // RX, TX
DFRobotDFPlayerMini myDFPlayer;

int shortHorn = 100;
int longHorn = 500;

bool deviceConnected = false;


// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer *pServer) {
    Serial.println("Device connected!");
    deviceConnected = true;

    // Play a sound on device connection
    myDFPlayer.play(35);  // Replace '1' with the track number you want to play
  }

  void onDisconnect(BLEServer *pServer) {
    Serial.println("Device disconnected!");
    deviceConnected = false;
  }
};

class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    //      Serial.println("Characteristic write event triggered");
    std::string rxValue = pCharacteristic->getValue().c_str();  // Data recieved from phone in string

    if (rxValue.length() > 0) {
      Serial.print("Received raw value: ");
      Serial.println(rxValue.c_str());

      Serial.print("ASCII values: ");
      for (char c : rxValue) {
        Serial.print((int)c);
        Serial.print(" ");
      }

      // Trim trailing spaces en onzichtbare tekens
      rxValue.erase(std::remove_if(rxValue.begin(), rxValue.end(), isspace), rxValue.end());

      // Converteer de string naar een integer
      int BLEValue = atoi(rxValue.c_str());
      // Serial.print("Parsed BLEValue: ");
      Serial.println(BLEValue);
      // Serial.println("voor switch");


      switch (BLEValue) {  //BLEValue =
        // Toeter
        // kort
        case 01:
          digitalWrite(21, HIGH);
          delay(shortHorn);
          digitalWrite(21, LOW);
          break;
        // lang
        case 02:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;



          // Klassen vlag
          //2501 -> 2 = klassen 50 = seconden (remaining time) 1 = heisen
        case 2501:
          myDFPlayer.play(24);
          Serial.println("50 sec");
          break;
        case 2401:
          myDFPlayer.play(25);
          Serial.println("40 sec");
          break;
        case 2301:
          myDFPlayer.play(8);
          Serial.println("30 sec");
          break;
        case 2201:
          myDFPlayer.play(26);
          Serial.println("20 sec");
          break;
        case 2101:
          myDFPlayer.play(9);
          Serial.println("10 sec");
          break;
        case 251:
             Serial.println("5 4 3 2 1 gooooooo");
          myDFPlayer.play(10);
          break;
        case 201:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

        // Strijken
        case 2500:
          myDFPlayer.play(24);
          break;
        case 2400:
          myDFPlayer.play(25);
          break;
        case 2300:
          myDFPlayer.play(11);
          break;
        case 2200:
          myDFPlayer.play(26);
          break;
        case 2100:
          myDFPlayer.play(12);
          break;
        case 250:
          Serial.println("5 4 3 2 1 gooooooo");
          myDFPlayer.play(13);
          break;
        case 200:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

        // Proceduren vlag
        //uniform vlag
        case 4501:
          myDFPlayer.play(24);
          break;
        case 4401:
          myDFPlayer.play(25);
          break;
        case 4301:
          myDFPlayer.play(1);
          break;
        case 4201:
          myDFPlayer.play(26);
          break;
        case 4101:
          myDFPlayer.play(2);
          break;
        case 451:
          myDFPlayer.play(3);
          break;
        case 401:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

        case 4500:
          myDFPlayer.play(24);
          break;
        case 4400:
          myDFPlayer.play(25);
          break;
        case 4300:
          myDFPlayer.play(4);
          break;
        case 4200:
          myDFPlayer.play(26);
          break;
        case 4100:
          myDFPlayer.play(5);
          break;
        case 450:
          myDFPlayer.play(6);
          break;
        case 400:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

        //zwarte vlag
        case 5501:
          myDFPlayer.play(24);
          break;
        case 5401:
          myDFPlayer.play(25);
          break;
        case 5301:
          myDFPlayer.play(31);
          break;
        case 5201:
          myDFPlayer.play(26);
          break;
        case 5101:
          myDFPlayer.play(32);
          break;
        case 551:
          myDFPlayer.play(20);
          break;
        case 501:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

        case 5500:
          myDFPlayer.play(24);
          break;
        case 5400:
          myDFPlayer.play(25);
          break;
        case 5300:
          myDFPlayer.play(7);
          break;
        case 5200:
          myDFPlayer.play(26);
          break;
        case 5100:
          myDFPlayer.play(21); //30 tot hijsen oranje
          break;
        case 550:
          myDFPlayer.play(22);
          break;
        case 500:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

          // papa vlag
        case 6501:
          myDFPlayer.play(24);
          break;
        case 6401:
          myDFPlayer.play(25);
          break;
        case 6301:
          myDFPlayer.play(14);
          break;
        case 6201:
          myDFPlayer.play(26);
          break;
        case 6101:
          myDFPlayer.play(15);
          break;
        case 651:
          myDFPlayer.play(16);
          break;
        case 601:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

        case 6500:
          myDFPlayer.play(24);
          break;
        case 6400:
          myDFPlayer.play(25);
          break;
        case 6300:
          myDFPlayer.play(17);
          break;
        case 6200:
          myDFPlayer.play(26);
          break;
        case 6100:
          myDFPlayer.play(18);
          break;
        case 650:
          myDFPlayer.play(19);
          break;
        case 600:
          digitalWrite(21, HIGH);
          delay(longHorn);
          digitalWrite(21, LOW);
          break;

        default:
          Serial.println("niet bekent in switch");
          break;
      }
    }
  }
};
void setup() {

  Serial.begin(9600);
  Serial.println("Starting BLE work!");
  pinMode(21, OUTPUT);



  //
  // bluetooth init begin
  //
  BLEDevice::init("AutoDick4");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);

  BLECharacteristic *pCharacteristic =
    pService->createCharacteristic(CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_WRITE);
  pCharacteristic->setCallbacks(new MyCallbacks());

  pService->start();

  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");


  //
  // bluetooth init end
  //


  mySerial.begin(9600);
  if (!myDFPlayer.begin(mySerial)) {  // Check connection to DFPlayer
    Serial.println(F("DFPlayer Mini niet gevonden!"));
    while (true)
      ;
  }
  Serial.println(F("DFPlayer Mini gereed."));
  myDFPlayer.volume(30);  // Zet volume (0 tot 30)
}
int i = 0;

//checking for errors and see if the track has finished playing
void loop() {
  if (myDFPlayer.available()) {
    int type = myDFPlayer.readType();
    int value = myDFPlayer.read();

    if (type == DFPlayerPlayFinished) {
      Serial.print("Track finished: ");
    }
  }
  delay(200);  // Reduce CPU load slightly
}
