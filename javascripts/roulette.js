

var roulette_outcomes = {
    'outcomes' : [
        {'value':'00', 'color': 'green', 'colorCode': "#00aa00"},
        {'value':0, 'color': 'green', 'colorCode': "#00aa00"},
        {'value':01, 'color': 'black', 'colorCode': "#000000"},
        {'value':03, 'color': 'black', 'colorCode': "#000000"},
        {'value':05, 'color': 'black', 'colorCode': "#000000"},
        {'value':07, 'color': 'black', 'colorCode': "#000000"},
        {'value':09, 'color': 'black', 'colorCode': "#000000"},
        {'value':11, 'color': 'black', 'colorCode': "#000000"},
        {'value':13, 'color': 'black', 'colorCode': "#000000"},
        {'value':15, 'color': 'black', 'colorCode': "#000000"},
        {'value':17, 'color': 'black', 'colorCode': "#000000"},
        {'value':19, 'color': 'black', 'colorCode': "#000000"},
        {'value':21, 'color': 'black', 'colorCode': "#000000"},
        {'value':23, 'color': 'black', 'colorCode': "#000000"},
        {'value':25, 'color': 'black', 'colorCode': "#000000"},
        {'value':27, 'color': 'black', 'colorCode': "#000000"},
        {'value':29, 'color': 'black', 'colorCode': "#000000"},
        {'value':31, 'color': 'black', 'colorCode': "#000000"},
        {'value':33, 'color': 'black', 'colorCode': "#000000"},
        {'value':35, 'color': 'black', 'colorCode': "#000000"},
        {'value':02, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':04, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':06, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':08, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':10, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':12, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':14, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':16, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':18, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':20, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':22, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':24, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':26, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':28, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':30, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':32, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':34, 'color': 'red', 'colorCode': "#ff0000"},
        {'value':36, 'color': 'red', 'colorCode': "#ff0000"},
    ]
}

const history = [
    
]
var counter = {}
for(let i = 0; i <=36; i++) {
    counter[i] = 0
}
counter["00"] = 0

const history_max_length = 10;
var money = 0
var totalBets = 0
var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

var outcomeToInlineString = function(outcome, shouldSpace = false) {
    var spaces = "&nbsp".repeat(5 - outcome.color.length)
    var spaces2 = "&nbsp".repeat(3 - String(outcome.value).length)
    if (shouldSpace == false) {
        spaces = ""
    }
    
    var output = "<strong><span style=\"font-family:courier; color: " 
        + outcome.colorCode + "\">" + outcome.color + " "  + spaces + outcome.value + spaces2;
       
    return output  + "</span></strong>"
}

function get_roulette_history() {
    var output = "<u>History:</u>"
    //history.forEach(elem => output += "</br>" + outcomeToInlineString(elem))
    for (let i = 0; i < history_max_length; i++) {
        //if(i != 0) {
        output += "<br>"
        //}
        if(i < history.length)
        {       
            output += outcomeToInlineString( history[i], true) 
            output += "&nbsp Net:" 
            if(history[i].deltaMoney > 0) {
                output += "+"
            }
            output += history[i].deltaMoney;
        }   
    }
    return output
}

function get_next_roulette_result() {
    var i = roulette_outcomes.outcomes.length * Math.random() << 0
    
    var outcome = roulette_outcomes.outcomes[i];
    
    counter[outcome.value] = Number(counter[outcome.value]) + 1
    console.log(counter)
    
    history.unshift(outcome)
    if(history.length > history_max_length) {
        history.pop();
    }
    return outcome
}

function get_roulette_result_formatted(result)
{
    
    // var output = "Rolled a d" + d100_effects.effects.length + " and got a <strong>" +(d100_effects.old_key+1) + "</strong>";
    // output += "<br>"
    // output += "<em>" + d100_effects.effects[i] + "</em>"
    var output = "rolled a <strong>" + outcomeToInlineString(result) + "</strong>"
    //history.forEach(elem => output += "</br>" + outcomeToInlineString(elem))
    return output;
}

function on_roulette_click(num) {
    for(let i = 0; i < num; i++) {
        on_roulette_click_helper()
    }
}

function on_roulette_click_helper() {
    document.getElementById('roll-history').innerHTML = get_roulette_history()
    var result = get_next_roulette_result()
    document.getElementById('roll-answer').innerHTML = get_roulette_result_formatted(result)
    var betAmount = document.querySelector('input[name=bet-amount]').value
    // console.log(betAmount + "betamount")
    var deltaMoney = betResult(result, betAmount)
    // console.log(result.value+ ":" +result.color + "; deltaMoney:" + deltaMoney)
    money += Number(deltaMoney)
    history[0]["deltaMoney"] = deltaMoney;
    document.getElementById('money').innerHTML = ("Total bets: " + totalBets + "<br>Earnings: " + money)
    var winLostString = "won $" + (Number(deltaMoney) + Number(betAmount)) + " money back"
    if(deltaMoney < 0) {
        winLostString = "lost it"
    }
    winLostString += "<br>Net: " 
    if(deltaMoney > 0) {
        winLostString += "+"
    }
    winLostString += deltaMoney
    document.getElementById('bet-result-text').innerHTML = ("placed a $"+betAmount+ " value bet<br>and " + winLostString)
}

function betResult(result, betAmount) {
    betSelectRadioButtons= document.querySelectorAll('input[name="bet-selection"]');
    var selectedValue = null
    for (let i = 0; i < betSelectRadioButtons.length; i++ ) {
        rb = betSelectRadioButtons[i]
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    if(selectedValue){
        //console.log("Selected:" + selectedValue)
        // bet exists
        totalBets++
        if(selectedValue == 'single') {
            var selected_single = document.getElementById('singles').value
            if(selected_single == result.value) {
                return betAmount * 34
            }
            else {
                return -betAmount
            }
        }
        else if (selectedValue == 'low') {
            if (result.value >= 1 && result.value <= 18) {
                return betAmount
            }
            return -betAmount
        }
        else if (selectedValue == 'high') {
            if(result.value >= 19 && result.value <= 36) {
                return betAmount
            }
            return -betAmount
        }
        else if (selectedValue == 'low3') {
            if(result.value == 1 || result.value == 2 || result.value == 3) {
                return betAmount * 10
            }
            return -betAmount
        }
        else if (selectedValue == 'zeroes') {
            if(result.value == "0" || result.value == "00") {
                return betAmount * 16
            }
            return -betAmount
        }
        else if (selectedValue == 'high4') {
            if(result.value >= 33 && result.value <= 36) {
                return betAmount * 7
            }
            return -betAmount
        }
        else if (selectedValue == 'basket') {
            if(result.value == "0" || result.value == "00" || result.value <=3)  {
                return betAmount * 5
            }
            return -betAmount
        }
        else if (selectedValue == 'dozen1') {
            if(result.value >= 1 && result.value <=12)  {
                return betAmount * 2
            }
            return -betAmount
        }
        else if (selectedValue == 'dozen2') {
            if(result.value >= 13 && result.value <=24)  {
                return betAmount * 2
            }
            return -betAmount
        }
        else if (selectedValue == 'dozen3') {
            if(result.value >= 25 && result.value <=36)  {
                return betAmount * 2
            }
            return -betAmount
        }
        // colors below this
        else if (selectedValue == "red" || selectedValue == "black") {
            if (result.color == selectedValue) {
                return betAmount;
            }
            else {
                return -betAmount;
            }
        }
    }
    else{
        // No bet
        return 0;
    }
}

function clampInput(value, min, max) {
    return Math.max(Math.min(max, value), min)
}