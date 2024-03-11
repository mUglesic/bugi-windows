
class Window {

    constructor(title) {

        this.title = title;

        this.generateHTML();
        
    }

    generateHTML() {

        /// WINDOW ///

        this.element = document.createElement("div");
        this.element.id = this.title.toLowerCase().replace(" ", "-");
        this.element.classList.add("window");

        /// TITLEBAR ///

        const titleBarElement = document.createElement("div");

        titleBarElement.classList.add("window-titlebar");

        this.element.append(titleBarElement);

        /// TITLE ///

        const titleElement = document.createElement("div");
        const titleSpanElement = document.createElement("span");
        titleSpanElement.innerHTML = this.title;

        titleElement.classList.add("window-title");

        titleElement.append(titleSpanElement);
        titleBarElement.append(titleElement);

        /// CONTROLS ///

        const controlsElement = document.createElement("div");
        const buttonMinimizeElement = document.createElement("button");
        const buttonCloseElement = document.createElement("button");

        buttonMinimizeElement.innerHTML = "_";
        buttonCloseElement.innerHTML = "X";

        controlsElement.classList.add("window-controls");
        buttonMinimizeElement.classList.add("btn-controls", "btn-minimize");
        buttonCloseElement.classList.add("btn-controls", "btn-close");

        controlsElement.append(buttonMinimizeElement, buttonCloseElement);
        titleBarElement.append(controlsElement);

        buttonCloseElement.addEventListener("click", () => {

            const index = WINDOWS.indexOf(this);

            if (index !== -1) {

                WINDOWS.splice(index, 1);

                this.element.remove();

            }

        });

        /// CONTENT ///

        const contentElement = document.createElement("div");

        contentElement.classList.add("window-content");

        this.element.append(contentElement);

    }

}