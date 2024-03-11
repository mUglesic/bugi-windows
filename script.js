
BUTTON_NEW_WINDOW.addEventListener("click", createNewWindow);

function createNewWindow() {

    const wNew = new Window(`Window ${WINDOWS.length + 1}`);

    WINDOWS.push(wNew);

    WINDOW_WRAPPER.append(wNew.element);

}