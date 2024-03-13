const BUTTON_NEW_WINDOW = document.getElementById("button-new-window");
const WINDOW_WRAPPER = document.getElementById("window-wrapper");
const TASKBAR = document.getElementById("taskbar");
const EXTRAS = document.getElementById("extras");

const WINDOWS = [];

let focus = {focusedWindow: null};
let focusProxy = new Proxy(focus, {
    set: function (target, key, value) {
        
        // console.log(`${key} (${target[key] === null ? "no focus" : target[key].title}) set to ${value === null ? "no focus" : value.title}`);

        let wPrev = target[key];
        let wNew = value;

        if (wPrev !== null) {
            wPrev.element.style.zIndex = "auto";
        }

        if (wNew !== null) {
            wNew.element.style.zIndex = "10";
        }
        
        target[key] = value;
        return true;
    }
});