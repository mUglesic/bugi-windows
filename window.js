
class Window {

    constructor(title) {

        this.title = title;

        this.generateHTML();

        this.minimized = false;
        
    }

    generateHTML() {

        /// WINDOW ///

        this.element = document.createElement("div");
        // this.element.id = this.title.toLowerCase().replace(" ", "-");
        this.element.classList.add("window", "open-animation");

        /// TASKBAR ///

        const taskbarElement = document.createElement("button");
        const taskbarSpanElement = document.createElement("span");
        taskbarSpanElement.innerHTML = this.title;

        taskbarElement.classList.add("window-taskbar");

        taskbarElement.append(taskbarSpanElement);
        TASKBAR.append(taskbarElement);

        taskbarElement.addEventListener("click", () => {

            this.element.classList.remove("open-animation", "minimize-animation", "maximize-animation");
            this.element.classList.add(this.minimized ? "maximize-animation" : "minimize-animation");

            setTimeout(() => {

                this.toggleMinimize();

            }, 200);

        });

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

        buttonMinimizeElement.addEventListener("click", () => {

            const index = WINDOWS.indexOf(this);

            if (index !== -1) {

                this.element.classList.remove("open-animation", "maximize-animation");
                this.element.classList.add("minimize-animation");

                setTimeout(() => {

                    this.toggleMinimize();

                }, 200);

            }

        });

        buttonCloseElement.addEventListener("click", () => {

            const index = WINDOWS.indexOf(this);

            if (index !== -1) {

                this.element.classList.remove("open-animation", "minimize-animation", "maximize-animation");
                this.element.classList.add("close-animation");

                setTimeout(() => {

                    WINDOWS.splice(index, 1);

                    taskbarElement.remove();
                    this.element.remove();

                }, 150);

            }

        });

        /// CONTENT ///

        const contentElement = document.createElement("div");

        contentElement.classList.add("window-content");

        this.element.append(contentElement);

    }

    toggleMinimize() {

        this.minimized = !this.minimized;

        this.element.style.display = this.minimized ? "none" : "flex";

    }

}