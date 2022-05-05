var diceCounter = 0;

function on_dice_click() {
    var innerHTML = get_dice_image_html(getRandomInt(6)+1)
    innerHTML += get_dice_image_html(getRandomInt(6)+1)
    innerHTML += "</br>"
    diceCounter += 1;
    innerHTML += "Num Rolls: " + diceCounter
    document.getElementById('DiceImageDisplay').innerHTML = innerHTML;
}

function get_dice_image_html(num) {
    var paddingSize = 7
    var right = getRandomInt(paddingSize)
    var top = getRandomInt(paddingSize)
    var left = paddingSize-right
    var bot = paddingSize-top
    
    var styleText = " style=";
    styleText += "padding-right:" + right + "px;"
    styleText += "padding-top:" + top + "px;"
    styleText += "padding-left:" + left + "px;"
    styleText += "padding-bottom:" + bot + "px;"
    styleText += " "

    var innerHTML = img_link_to_html("images/dice_" + num + ".png");
    innerHTML = innerHTML.substring(0,4) + styleText + innerHTML.substring(4);
    return innerHTML
}

function getRandomInt(range) {
    return range * Math.random() << 0
}

function img_link_to_html(link, altText=null) {
    if(altText == null) {
        altText = ""
    }

    return "<img src=\""+ link +"\" alt=\"" + altText + "\">";

}