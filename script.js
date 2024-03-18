
BUTTON_NEW_WINDOW.addEventListener("click", createNewWindow);

function createNewWindow() {

    if (WINDOWS.length >= 8) {

        return;

    }

    const xRand = Math.floor(200 + (Math.random() * 100) * (Math.random() > 0.5 ? 1 : -1));
    const yRand = Math.floor(200 + (Math.random() * 100) * (Math.random() > 0.5 ? 1 : -1));

    const wNew = new Window(`Window ${WINDOWS.length + 1}`, xRand, yRand, [lipsum1, img1src, lipsum2, lipsum3]);

    WINDOWS.push(wNew);

    WINDOW_WRAPPER.append(wNew.element);

    focusProxy.focusedWindow = wNew;

}