/////////////
// Imports //
/////////////
import { me } from "appbit";
import { me as device } from "device";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import { BodyPresenceSensor } from "body-presence";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { display } from "display";
import clock from "clock";
import document from "document";
import * as fs from "fs";
import * as messaging from "messaging";
import * as util from "../common/utils";


///////////////
// Constants //
///////////////
const CONSOLE_TEXT = "user@" + `${device.modelName}`.toLowerCase().replace(" ", '') + ":~ $";
const TIME_LABEL = "[TIME]";
const DATE_LABEL = "[DATE]";
const BATTERY_LABEL = "[BATT]";
const HEARTRATE_LABEL = "[HR     ]";
const STEPS_LABEL = "[STEP]";
const AZM_LABEL = "[AZM  ]";


//////////
// Main //
//////////
clock.granularity = "seconds";

updateStaticLabels();

clock.addEventListener("tick", updateClock);
battery.addEventListener("change", updateBattery);

if (HeartRateSensor) {
  const heartRateValueLabel = document.getElementById("heartRateValueLabel");
  const hrm = new HeartRateSensor();
  
  hrm.addEventListener("reading", () => {
    heartRateValueLabel.text = `${hrm.heartRate}` + " bpm";
  });
  
  display.addEventListener("change", () => {
    display.on ? hrm.start() : hrm.stop();
  });
  
  hrm.start();
}

if (BodyPresenceSensor) {
  const bodyPresence = new BodyPresenceSensor();
  const heartRateValueLabel = document.getElementById("heartRateValueLabel");
  
  bodyPresence.addEventListener("reading", () => {
    if (!BodyPresenceSensor.present) {
      heartRateValueLabel = "-- bpm";
    }
  });

  display.addEventListener("change", () => {
    display.on ? bodyPresence.start() : bodyPresence.stop();
  });

  bodyPresence.start();
}

let stepsValueLabel = document.getElementById("stepsValueLabel");
stepsValueLabel.text = updateSteps();


///////////////
// FUNCTIONS //
///////////////
function updateStaticLabels() {
  let cLabel = document.getElementById("consoleLabel");
  cLabel.text = CONSOLE_TEXT + " fit_data";
  
  const timeLabel = document.getElementById("timeLabel");
  timeLabel.text = TIME_LABEL;
  
  const dateLabel = document.getElementById("dateLabel");
  dateLabel.text = DATE_LABEL;
  
  const batteryLabel = document.getElementById("batteryLabel");
  batteryLabel.text = BATTERY_LABEL;
  
  const heartRateLabel = document.getElementById("heartRateLabel");
  heartRateLabel.text = HEARTRATE_LABEL;
  
  const stepsLabel = document.getElementById("stepsLabel");
  stepsLabel.text = STEPS_LABEL;
}

function updateClock() {
  let today = new Date();
  let hours = today.getHours();
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.monoDigits(hours, true);
  }
  let mins = util.monoDigits(today.getMinutes(), true);
  let secs = util.monoDigits(today.getSeconds(), true);
  let timeValueLabel = document.getElementById("timeValueLabel");
  timeValueLabel.text = `${hours}:${mins}:${secs}`;
  
  let dateValueLabel = document.getElementById("dateValueLabel");
  dateValueLabel.text = util.getDate();
  
  let bLabel = document.getElementById("blinkingLabel");
  if (bLabel.text == (CONSOLE_TEXT))
    bLabel.text = CONSOLE_TEXT + " _";
  else
    bLabel.text = CONSOLE_TEXT;
}

function updateBattery() {
  let batteryValueLabel = document.getElementById("batteryValueLabel");
  batteryValueLabel.text = util.getBatteryText(battery.chargeLevel);
  batteryValueLabel.style.fill = util.getBatteryTextColor(battery.chargeLevel);
}

function updateSteps() {
  if (me.permissions.granted("access_activity")) {
     return today.adjusted.steps;
  } else {
    return "--";
  }
}
