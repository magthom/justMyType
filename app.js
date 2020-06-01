$(document).ready(function () {
$("#keyboard-upper-container").hide();

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'
];

let sentenceIndex = 0;
let letterIndex = 0;
let currentSentence = sentences[0];
$("#sentence").append(currentSentence);

let targetLetter = $("#target-letter");
let currentLetter = currentSentence[0];


let start;
let finish;
let errors = 0;

$("#target-letter").append(currentLetter);

$(document).keydown(function (e) {
    if (e.keyCode === 16) {
        $("#keyboard-upper-container").show();
        $("#keyboard-lower-container").hide();
    }
});
$(document).keyup(function (e) {
    if (e.keyCode === 16) {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
    }
});

$(document).keypress(function (e) {
    let $key = $("#" + e.which);
    $($key).css("background-color", "yellow");

    $(document).keyup(function (e) {
        $($key).css("background-color", "initial");
    });
});

$(document).keypress(function (e) {
    let keypress = event.which;
    $("#" + keypress).addClass('highlight');

    if (start === undefined) {
        start = event.timeStamp;
    }
    $("yellow-block").css("left", "+=17.5px");

    letterIndex++;
    let nextLetter = currentSentence[letterIndex];
    targetLetter.text(nextLetter);

    if (letterIndex < currentSentence.length - 1) {
        if(event.which === currentLetter.charCodeAt()) {
        $("#feedback").append("<div class = 'glyphicon glyphicon-ok'></div>");
     } else {
        $("#feedback").append("<div class = 'glyphicon glyphicon-remove'></div>");
        errors++;
    }
}
if (letterIndex == currentSentence.length) {
    $("#sentence").empty();
    sentenceIndex++;
    currentSentence = sentences[sentenceIndex];

    $("#sentence").append(sentences[sentenceIndex]);

    letterIndex = 0;
    if (sentenceIndex < sentences.length - 1) {
        let nextLetter = currentSentence[letterIndex];
    }
    targetLetter.text(nextLetter);
    $("#yellow-block").css({left: 17});
    $("#feedback").empty();
}
if(sentenceIndex > sentences.length - 1) {
    finish = event.timeStamp;
    let time = (finish - start);
    time /= 60000;
    let speed = Math.round((54 / time) - (errors * 2));

    $("#target-letter").text(speed + " words per minute!");
}
});
});
