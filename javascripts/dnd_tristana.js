var tabManager = {
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // hide all tabcontent
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if(tabcontent[i].style.display != "none")
        {
            tabcontent[i].style.display = "none";
            document.getElementsByClassName("tabholder")[0].style.height = $(tabcontent[i]).height() + "px"
        }
    }
    // make all tablinks inactive
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // display our tab, and tablink
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    // document.getElementsByClassName("tabholder")[0].style.height = $(document.getElementById(tabName)).height() + "px";
    document.getElementsByClassName("tabholder")[0].style.height = 'auto';
    //document.getElementById("tabHolder").style.height = '100px';
    //alert("yo");
    //alert(document.getElementById("tabHolder").style.zIndex)
}

$(document).keypress(function(event){
    var c = String.fromCharCode(event.which); 
    
    var tabNames = ['About', 'Character Sheet', 'Emotional Magic', 'General Magic']
    
    var tabName = null
    if(c == '1' 
    || c == '2'
    || c == '3'
    || c == '4')
    {
        tabName = tabNames[parseInt(c)-1]
    }
    if(tabName != null)
    {
        var tabLinks = document.getElementsByClassName("tablinks");
        for(let tabLink of tabLinks)
        {
            if(tabLink.innerHTML == tabName)
            {
                tabLink.click();
            }
        }
        //openTab();
    }
});

function add_hp(n)
{
    var currHP = parseInt(document.getElementById("hp_display").innerHTML);
    var newHP = currHP + n;
    document.getElementById("hp_display").innerHTML = newHP;
}

$mydialog = $("#dialog").dialog({
    autoOpen:false
});
// $( "popupinfo").click(function() {
//     $(".dialog").dialog("open");
// })


// function popup(evt, str)
// {
//     $(function(){
//         $(".dialog").dialog();
//     });
// }

function popup(event, title, str, width)
{
    //alert(width == undefined);
    
    // this line removes tags from strings ("<i>poop</i>" -> "poop")
    document.getElementById("dialog").title = "Info: " + event.currentTarget.innerHTML.replace(/(<([^>]+)>)/ig,"");
    
    
    //var poop = document.getElementById("dialog").title;
    title = "Info: " + title;
    //alert(poop[0]);
    $(function(){
        
        $('#dialog').dialog({title:title});
        if(width != undefined)
        {
            $('#dialog').dialog({
                title:title,
                width:width
            });
        }
        $("#dialog").html(str);
        //alert($("#dialog").innerHTML);
        $("#dialog").dialog();
        //$("#dialog").style="display:block"
        //$("#dialog").show();
        
        // alert(dialogbox.innerHTML);
        // var elem = $(.)
        //alert("sup");
    });
}

function toggleDiv(evt, id){
    var elem = document.getElementById(id);
    if(elem.style.height == '0px'){
        elem.style.height = 'auto';
    }
    else {
        elem.style.height = '0px';
    }
}

function constructor(){
    window.onload = init;
    function init(){
        alert(document.getElementById("main_slider_tabs").style);
        
        var slider = document.getElementById("main_slider_tabs").sliderTabs({
            autoplay:false,
            mousewheel:false,
            indicators:false,
            panelArrows:false,
            tabs:true,
            transition:'fade',
            classes:{
                
            }
        });
    }
}


