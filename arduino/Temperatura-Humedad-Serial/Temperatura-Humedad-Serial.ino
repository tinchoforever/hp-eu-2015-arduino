#include <SPI.h>
#include "DHT.h"

//Sensors
#define DHTPIN 2      //Dht11 in pin 2
#define DHTTYPE DHT11
#define ground 0 // humidity ground in pin A0

DHT dht(DHTPIN, DHTTYPE);

float time=0.0f;
#define TIMER_DELAY 1.0f
float timer=TIMER_DELAY;


bool posting; // or getting
char Status;
double T2,H; //DHT11 values
double soilHumidity; //Humidity value


void setup() {
  Serial.begin(115200);  
  Serial.println("Start");
  dht.begin();
  while (!Serial) {
  
  }

  time=millis()/1000.0f;
  posting=true;

}

void loop()
{
  delay(1000); 
  leerSensores();
}

void leerSensores() {

  T2 = dht.readTemperature();
  H = dht.readHumidity();
  Serial.println("Temperatura: ");
  Serial.println(T2); 
  Serial.println("Humedad: ");  
  Serial.println(H);
  
  soilHumidity = 100 - analogRead(ground) /10; 
  if(soilHumidity < 0 ){
     soilHumidity = 0;
  }
  Serial.println("Humedad de la tierra:"); 
  Serial.println(soilHumidity);  
  Serial.println("-------------------");
}

