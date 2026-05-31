/* ============================================
   SHARED FEATURES - All Pages
   ============================================ */

/* --- 1. Dynamic "X people watching" counter --- */
(function initWatchingCounter() {
    var el = document.getElementById('watching-count');
    if (!el) return;
    var number = Math.floor(Math.random() * 1143) + 1578;
    el.innerHTML = number;
    setInterval(function () {
        var change = Math.floor(Math.random() * 11) - 3; // -3 to +7 (mostly up)
        number = Math.max(800, number + change);
        el.innerHTML = number;
    }, 10000);
})();

/* --- 2. Block F12, Ctrl+U, Ctrl+P, Ctrl+I, Ctrl+Shift+I, Right Click --- */
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

document.onkeypress = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) { return false; }
    if (event.keyCode == 93) { return false; }
    if (event.keyCode == 85) { return false; }
    if (event.keyCode == 80) { return false; }
    if (event.keyCode == 44) { return false; }
    if (event.keyCode == 73) { return false; }
};

document.onmousedown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) { return false; }
    if (event.keyCode == 93) { return false; }
    if (event.keyCode == 85) { return false; }
    if (event.keyCode == 80) { return false; }
    if (event.keyCode == 44) { return false; }
    if (event.keyCode == 73) { return false; }
};

document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) { return false; }
    if (event.keyCode == 93) { return false; }
    if (event.keyCode == 85) { return false; }
    if (event.keyCode == 80) { return false; }
    if (event.keyCode == 44) { return false; }
    if (event.keyCode == 73) { return false; }
};

/* --- 3. Circular SVG Countdown Timer --- */
(function initCircularTimer() {
    var container = document.getElementById('circular-timer');
    if (!container) return;

    var FULL_DASH_ARRAY = 283;
    var WARNING_THRESHOLD = 120; // 2 min
    var ALERT_THRESHOLD = 60;   // 1 min

    var COLOR_CODES = {
        info: { color: "green" },
        warning: { color: "orange", threshold: WARNING_THRESHOLD },
        alert: { color: "red", threshold: ALERT_THRESHOLD }
    };

    // Read time limit from data attribute (in seconds), default 15 min
    var TIME_LIMIT = parseInt(container.getAttribute('data-seconds')) || 900;
    var timePassed = 0;
    var timeLeft = TIME_LIMIT;
    var timerInterval = null;
    var remainingPathColor = COLOR_CODES.info.color;

    container.innerHTML =
        '<div class="base-timer">' +
        '  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '    <g class="base-timer__circle">' +
        '      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>' +
        '      <path id="base-timer-path-remaining" stroke-dasharray="283"' +
        '        class="base-timer__path-remaining ' + remainingPathColor + '"' +
        '        d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>' +
        '    </g>' +
        '  </svg>' +
        '  <span id="base-timer-label" class="base-timer__label">' + formatTime(timeLeft) + '</span>' +
        '</div>';

    startTimer();

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function startTimer() {
        timerInterval = setInterval(function () {
            timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;

            var label = document.getElementById("base-timer-label");
            if (label) label.innerHTML = formatTime(timeLeft);

            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            // Also sync with text countdown if exists
            var textCountdown = document.getElementById('countdown');
            if (textCountdown) textCountdown.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                onTimesUp();
            }
        }, 1000);
    }

    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        if (seconds < 10) { seconds = '0' + seconds; }
        return minutes + ':' + seconds;
    }

    function setRemainingPathColor(timeLeft) {
        var alert = COLOR_CODES.alert;
        var warning = COLOR_CODES.warning;
        var info = COLOR_CODES.info;
        var el = document.getElementById("base-timer-path-remaining");
        if (!el) return;

        if (timeLeft <= alert.threshold) {
            el.classList.remove(warning.color);
            el.classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            el.classList.remove(info.color);
            el.classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        var rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        var circleDasharray = (calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0) + ' 283';
        var el = document.getElementById("base-timer-path-remaining");
        if (el) el.setAttribute("stroke-dasharray", circleDasharray);
    }
})();
