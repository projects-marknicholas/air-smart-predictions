'''
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include <sps30.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define BME_SCK 13
#define BME_MISO 12
#define BME_MOSI 11
#define BME_CS 10

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME680 bme; // I2C

// const char* ssid = "TP-Link_AB9A";
// const char* password = "79959612";
const char* ssid = "Marknicholas";
const char* password = "marknicholas0607";
String URL = "https://air-quality.mchaexpress.com/sensor_insert.php";

const char* fingerprint = "c:\Users\User\Documents\Arduino\air-quality-asor\air-quality-asor.inoCB:58:A4:F3:9E:C3:B8:2D:AD:BA:66:39:4C:8B:47:BB:5C:A2:4F:60";

unsigned long previousMillis = 0;  // Variable to store the last time data was sent
const unsigned long interval = 10000;  // Interval between data sends (in milliseconds)

void setup() {c:\Users\User\Documents\Arduino\air-smart\air-quality-asor.ino
  Serial.begin(9600);
  while (!Serial);
  Serial.println(F("BME680 test"));

  // Connect to WiFi
  connectToWiFi();

  if (!bme.begin()) {
    Serial.println("Could not find a valid BME680 sensor, check wiring!");
    while (1);
  }

  // Set up oversampling and filter initialization
  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setPressureOversampling(BME680_OS_4X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme.setGasHeater(320, 150); // 320*C for 150 ms

  // Initialize SPS30 sensor
  sensirion_i2c_init();

  while (sps30_probe() != 0) {
    Serial.print("SPS sensor probing failed\n");
    delay(500);
  }

  Serial.print("SPS sensor probing successful\n");

  // Start SPS30 measurement
  int16_t ret = sps30_start_measurement();
  if (ret < 0) {
    Serial.print("error starting SPS30 measurement\n");
  }
}

void loop() {
  unsigned long currentMillis = millis();  // Get the current time

  if (currentMillis - previousMillis >= interval) {  // Check if it's time to send data
    previousMillis = currentMillis;  // Update the last time data was sent

    // Read data from BME680 sensor
    if (! bme.performReading()) {
      Serial.println("Failed to perform BME680 reading 🙁");
      return;
    }

    // Read data from SPS30 sensor
    struct sps30_measurement m;
    if (sps30_read_measurement(&m) < 0) {
      Serial.println("Failed to perform SPS30 reading 🙁");
      return;
    }

    // Send data to server
    sendDataToServer(bme.temperature, bme.pressure / 100.0, bme.humidity, bme.gas_resistance / 1000.0, bme.readAltitude(SEALEVELPRESSURE_HPA), m.nc_10p0, m.mc_1p0, m.mc_2p5, m.mc_4p0, m.mc_10p0, m.nc_1p0, m.nc_2p5, m.nc_4p0);

    // Print data to Serial monitor
    Serial.println("Data sent to server");

    delay(1000);
  }
}

void connectToWiFi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());
}

void sendDataToServer(float temperature, float pressure, float humidity, float gasResistance, float altitude, float NC10, float PM1_0, float PM2_5, float PM4_0, float PM10, float NC1_0, float NC2_5, float NC4_0) {
  WiFiClientSecure client;
  HTTPClient http;

  // Set fingerprint
  client.setFingerprint(fingerprint);

  // Construct POST data string
  String postData = "temperature=" + String(temperature) + "&pressure=" + String(pressure) + "&humidity=" + String(humidity) + "&gas=" + String(gasResistance) + "&altitude=" + String(altitude) + "&NC10=" + String(NC10) + "&PM1_0=" + String(PM1_0) + "&PM2_5=" + String(PM2_5) + "&PM4_0=" + String(PM4_0) + "&PM10=" + String(PM10) + "&NC1_0=" + String(NC1_0) + "&NC2_5=" + String(NC2_5) + "&NC4_0=" + String(NC4_0);

  http.begin(client, URL);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  
  int httpCode = http.POST(postData);
  String payload = "";

  if(httpCode > 0) {
    // file found at server
    if(httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println(payload);
    } else {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
    }
  } else {
    Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  
  http.end();  //Close connection

  Serial.print("URL : "); Serial.println(URL); 
  Serial.print("Data: "); Serial.println(postData);
  Serial.print("httpCode: "); Serial.println(httpCode);
  Serial.print("payload : "); Serial.println(payload);
  Serial.println("--------------------------------------------------");
}
'''
