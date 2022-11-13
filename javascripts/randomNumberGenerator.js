function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j]; 
        array[j] = temp;

    }

    return array;
}

function cleanRandInput () {

    
    var min = parseInt($("#randMinInput").val());
    var max = parseInt($("#randMaxInput").val());
    var outputCount = parseInt($("#randOutputCount").val());
    
    if (min > max) {
        $("#randMinInput").val(max); 
        $("#randMaxInput").val(min);
        var swap = min;
        min = max;
        max = swap;
    }

    if(max > 1000000) {
        //TODO: change to work with any number size (set or hashtable or smth?)
        $("#randMaxInput").val(1000000);
        max = 1000000; 
    }
    if(min < -1000000) {
        $("#randMinInput").val(-1000000);
        min = -1000000; 
    }

    if (outputCount > max - min + 1) {
        $("#randOutputCount").val(max - min + 1);
        outputCount = max - min + 1;
    }
    if(outputCount < 1) {
        $("#randOutputCount").val(1);
        outputCount = 1;
    }
}

function getOrdinalSuffix(num) {
    var n  = num % 10;
    if(n == 1) {
        return "st";
    }
    else if (n == 2) {
        return "nd";
    }
    else if (n == 3) {
        return "rd";
    } 
    else {
        return "th";
    }
}

function generateRandomNumbers() {
    // get min, max, output length from input forms
    cleanRandInput();
    var min = parseInt($("#randMinInput").val());
    var max = parseInt($("#randMaxInput").val());
    var outputCount = parseInt($("#randOutputCount").val());

    // create array 
    var array = [ ...Array(max - min + 1).keys() ]; 
    // shuffle array 
    shuffle(array);
    // optimization: only need to shuffle the first n elements

    // make html that has only the first n elements
    var output = "";
    for(var i = 0; i < outputCount; i++) {
        output += (i+1) + getOrdinalSuffix(i+1) + ": "
        output += array[i] + min;
        output += "<br>"
    }
    // set html
    $("#randomNumberDiv").html(output);
}

$(function () {
    $("#randMinInput").on("change", cleanRandInput); 
    $("#randMaxInput").on("change", cleanRandInput); 
    $("#randOutputCount").on("change", cleanRandInput); 
});
