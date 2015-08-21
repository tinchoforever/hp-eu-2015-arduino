// ---------------------------------------------------------------------------
// NewPing library sketch that interfaces with all but the SRF06 sensor using
// only one Arduino pin. You can also interface with the SRF06 using one pin
// if you install a 0.1uf capacitor on the trigger and echo pins of the sensor
// then tie the trigger pin to the Arduino pin (doesn't work with Teensy).
// ---------------------------------------------------------------------------


#define PING_PIN  7  // Arduino pin tied to both trigger and echo pins on the ultrasonic sensor.
#define MAX_DISTANCE 200 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.

NewPing sonar(PING_PIN, PING_PIN, MAX_DISTANCE); // NewPing setup of pin and maximum distance.

void setup() {
  Serial.begin(115200); // Open serial monitor at 115200 baud to see ping results.
}

void loop() {
  // Wait 50ms between pings (about 20 pings/sec). 29ms should be the shortest delay between pings.
  unsigned int uS = sonar.ping(); // Send ping, get ping time in microseconds (uS).
  //if(soundReading > 34){
  Serial.print("B"); 
  Serial.print(uS / US_ROUNDTRIP_CM); // Convert ping time to distance and print result (0 = outside set distance range, no ping echo)
  Serial.print("E");    
  delay(1000);		//Espera 100 milisegundos
 
}
 
 
