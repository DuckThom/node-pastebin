var socket = io(window.location.href);

var $mode = document.getElementById('mode-selector');
var $font = document.getElementById('font-selector');
var $theme = document.getElementById('theme-selector');
var $fontSize = document.getElementById('fontsize-selector');
var $editor = document.getElementById('editor');
var $saveButton = document.getElementById('save-button');
var $newButton = document.getElementById('new-button');
var $forkButton = document.getElementById('fork-button');

socket.on('connect', function () {
    console.log('Connection to socket.io succeeded');
});

var readOnly = $editor.getAttribute('data-readonly');
var mode = $editor.getAttribute('data-mode');
var editor = ace.edit("editor");

editor.setTheme("ace/theme/" + $theme.value);
editor.setFontSize(20);
editor.getSession().setMode(mode ? mode : $mode.value);
editor.setReadOnly(readOnly);
editor.$blockScrolling = Infinity;

var $aceEditor = document.querySelector('.ace_editor');

$aceEditor.style.fontFamily = "'" + $font.value.replace(/\+/g, " ") + "', monospace";

// If a fork url is in a cookie, load it
if (Cookies.get('fork')) {
    socket.emit('fork', {
        url: Cookies.get('fork')
    }, function (data) {
        editor.setValue(data.content);
    });

    Cookies.remove('fork');
}

/**
 * Functions
 */

window.setFont = function () {
    console.log("Changing font to " + $font.value);

    $aceEditor.style.fontFamily = "'" + $font.value.replace(/\+/g, " ") + "', monospace";
}

window.setFontSize = function () {
    console.log("Changing font size to " + $fontSize.value);

    $aceEditor.style.fontSize = $fontSize.value + 'px';
}

window.setTheme = function () {
    console.log("Changing theme to " + $theme.value);

    editor.setTheme("ace/theme/" + $theme.value);
}

window.setMode = function () {
    console.log("Changing mode to " + $mode.value);

    editor.getSession().setMode($mode.value);
}

window.savePasta = function () {
    console.log("Saving pasta");

    socket.emit('save', {
        content: editor.getValue(),
        mode: $mode.value
    }, function (data) {
        if (data.url) {
            window.location.href = data.url
        }
    });
}

window.forkPasta = function () {
    var pasta = window.location.pathname.replace("/", "");

    Cookies.set('fork', pasta);

    window.location.href = "/";
}

window.newPasta = function () {
    window.location.href = '/';
}

/**
 * Event handlers
 */

$font.addEventListener('change', window.setFont);
$fontSize.addEventListener('change', window.setFontSize);
$theme.addEventListener('change', window.setTheme);
$mode.addEventListener('change', window.setMode);

if (!readOnly) {
    $saveButton.addEventListener('click', window.savePasta);
} else {
    $forkButton.addEventListener('click', window.forkPasta);
    $newButton.addEventListener('click', window.newPasta);
}
