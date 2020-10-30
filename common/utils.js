///////////////
// Constants //
///////////////
const c0 = String.fromCharCode(0x10);
const c1 = String.fromCharCode(0x11);
const c2 = String.fromCharCode(0x12);
const c3 = String.fromCharCode(0x13);
const c4 = String.fromCharCode(0x14);
const c5 = String.fromCharCode(0x15);
const c6 = String.fromCharCode(0x16);
const c7 = String.fromCharCode(0x17);
const c8 = String.fromCharCode(0x18);
const c9 = String.fromCharCode(0x19);

////////////////////////
// Exported Functions //
////////////////////////

// Convert a number to a special monospace number
export function monoDigits(num, pad = true) {
  let monoNum = '';
  if (typeof num === 'number') {
    num |= 0;
    if (pad && num < 10) {
      monoNum = c0 + monoDigit(num);
    } else {
      while (num > 0) {
        monoNum = monoDigit(num % 10) + monoNum;
        num = (num / 10) | 0;
      }
    }
  } else {
    let text = num.toString();
    let textLen = text.length;
    for (let i = 0; i < textLen; i++) {
      monoNum += monoDigit(text.charAt(i));
    }
  }
  return monoNum;
}

export function getDate()
{
  let rightNow = new Date();
  
  return getWeekday(rightNow.getDay()) + " " + rightNow.getDate() + " " + getMonth(rightNow.getMonth());
}

export function getBatteryText(digit)
{
  let result = "";
  let hashtagCount = digit == 100 ? 10 : (Math.floor(digit/10))%10;
  
  for (let i=0; i<hashtagCount;i++) {
    result += "#";
  }
  
  if (hashtagCount != 10)
    result += " ";
  
  for (let i=0; i< (10 - hashtagCount); i++) {
    result += ". ";
  }
  
  return result;
}

export function getBatteryTextColor(digit)
{
  if (digit >= 75)
    return "fb-green";
  else if (digit >= 50)
    return "fb-yellow";
  else if (digit >= 25)
    return "fb-orange";
  else
    return "fb-red";
}
///////////////
// Functions //
///////////////

function monoDigit(digit) {
  switch (digit) {
    case 0: return c0;
    case 1: return c1;
    case 2: return c2;
    case 3: return c3;
    case 4: return c4;
    case 5: return c5;
    case 6: return c6;
    case 7: return c7;
    case 8: return c8;
    case 9: return c9;
    case '0': return c0;
    case '1': return c1;
    case '2': return c2;
    case '3': return c3;
    case '4': return c4;
    case '5': return c5;
    case '6': return c6;
    case '7': return c7;
    case '8': return c8;
    case '9': return c9;
    default: return digit;
  }
}

function getWeekday(digit) {
  switch(digit) {
    case 0: return "Sun";
    case 1: return "Mon";
    case 2: return "Tue";
    case 3: return "Wed";
    case 4: return "Thu";
    case 5: return "Fri";
    case 6: return "Sat";
    default: return digit;
  }
}

function getMonth(digit) {
  switch(digit) {
    case 0: return "Jan";
    case 1: return "Feb";
    case 2: return "Mar";
    case 3: return "Apr";
    case 4: return "May";
    case 5: return "Jun";
    case 6: return "Jul";
    case 7: return "Aug";
    case 8: return "Sep";
    case 9: return "Oct";
    case 10: return "Nov";
    case 11: return "Dec";
    default: return digit;
  }
}
