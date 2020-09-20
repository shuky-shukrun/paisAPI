# Pais API
Unofficial REST API for the Israeli lottery company using Node.js, mongoDB, and Azure App Service.

For api-docs [click here](https://paisapi.azurewebsites.net/api-docs/)

## Examples
| Request | Link |
| ------------- | ------------- |
| Recent lottery | https://paisapi.azurewebsites.net/lotto/recent |
| Specific lottery | https://paisapi.azurewebsites.net/lotto/3200 |
| Range, by lotteries number (increasing) | https://paisapi.azurewebsites.net/lotto/byID/3200/3210 |
| Range, by lotteries number (decreasing) | https://paisapi.azurewebsites.net/lotto/byID/3210/3200 |
| Range, by lotteries date (increasing) | https://paisapi.azurewebsites.net/lotto/byDates/2012-06-01/2012-07-01 |
| Range, by lotteries date (decreasing) | https://paisapi.azurewebsites.net/lotto/byDates/2012-07-01/2012-06-01 |
| All lotteries (USE CAREFULLY, result may be huge) | https://paisapi.azurewebsites.net/lotto |

## Result format
```JSON
{
    "_id": 2013, //מספר הגרלה
    "date": "2009-02-28T12:00:00.000Z", // תאריך
    "winNumbers": [8, 8, 14, 24, 28, 34], // המספרים הזוכים
    "strongNumber": 8, // המספר החזק
    "firstPrizeReg": 10000000, // גובה הפרס הראשון
    "firstPrizeDouble": 20000000, // גובה הפרס הראשון בדאבל לוטו
    "secondPrizeReg": 500000, // גובה הפרס השני
    "secondPrizeDouble": 1000000, // גובה הפרס השני
    "sumGivenPrizes": 2787345, // סכום הפרסים שחולקו בהגרלה זו
    "winTableReg": { // טבלת זכיות בלוטו רגיל
        "sixPlus": { // ניחשו 6 + מספר חזק
            "winners": 0, // מספר המנחשים
            "sumPrize": 0 // סכום הזכיה לכל מנחש
        },
        "six": { // ניחשו 6 ללא מספר חזק
            "winners": 4, // מספר המנחשים
            "sumPrize": 125000 // סכום הזכיה לכל אחד
        },
        "fivePlus": {
            "winners": 15,
            "sumPrize": 7241
        },
        "five": {
            "winners": 116,
            "sumPrize": 498
        },
        "fourPlus": {
            "winners": 581,
            "sumPrize": 144
        },
        "four": {
            "winners": 3477,
            "sumPrize": 57
        },
        "threePlus": {
            "winners": 7421,
            "sumPrize": 38
        },
        "three": {
            "winners": 47103,
            "sumPrize": 10
        }
    },
    "winTableDouble": { // טבלת הזכיות בדאבל לוטו
        "sixPlus": {
            "winners": 0,
            "sumPrize": 0
        },
        "six": {
            "winners": 0,
            "sumPrize": 0
        },
        "fivePlus": {
            "winners": 2,
            "sumPrize": 14482
        },
        "five": {
            "winners": 34,
            "sumPrize": 996
        },
        "fourPlus": {
            "winners": 218,
            "sumPrize": 288
        },
        "four": {
            "winners": 1277,
            "sumPrize": 114
        },
        "threePlus": {
            "winners": 2606,
            "sumPrize": 76
        },
        "three": {
            "winners": 15956,
            "sumPrize": 20
        }
    },
    "url": "https://www.pais.co.il/lotto/currentlotto.aspx?lotteryId=2013" // קישור לאתר מפעל הפיס
}
```