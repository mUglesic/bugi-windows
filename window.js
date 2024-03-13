
class Window {

    constructor(title, x, y) {

        this.title = title;
        this.position = {x: x, y: y};
        this.mouseOffset = {x: 0, y: 0};

        this.generateHTML();

        this.minimized = false;
        this.held = false;
        
    }

    generateHTML() {

        /// WINDOW ///

        this.element = document.createElement("div");
        // this.element.id = this.title.toLowerCase().replace(" ", "-");
        this.element.classList.add("window", "open-animation");

        this.updatePosition();

        this.element.addEventListener("click", () => {

            focusProxy.focusedWindow = this;

        });

        /// DRAG OUTLINE ///

        const dragOutlineElement = document.createElement("div");
        dragOutlineElement.classList.add("drag-outline");

        dragOutlineElement.style.top = `${this.position.y}px`;
        dragOutlineElement.style.left = `${this.position.x}px`;

        dragOutlineElement.addEventListener("mouseup", (e) => {

            this.held = false;
            dragOutlineElement.remove();

            this.position = {x: e.clientX - this.mouseOffset.x, y: e.clientY - this.mouseOffset.y};

            focusProxy.focusedWindow = this;

            this.updatePosition();

        });

        dragOutlineElement.addEventListener("mousemove", (e) => {

            dragOutlineElement.style.top = `${e.clientY - this.mouseOffset.y}px`;
            dragOutlineElement.style.left = `${e.clientX - this.mouseOffset.x}px`;

        });

        /// TASKBAR ///

        const taskbarElement = document.createElement("button");
        const taskbarSpanElement = document.createElement("span");
        taskbarSpanElement.innerHTML = this.title;

        taskbarElement.classList.add("window-taskbar");

        taskbarElement.append(taskbarSpanElement);
        TASKBAR.append(taskbarElement);

        taskbarElement.addEventListener("click", () => {

            if (focus.focusedWindow === this || this.minimized) {

                this.element.classList.remove("open-animation", "minimize-animation", "maximize-animation");
                this.element.classList.add(this.minimized ? "maximize-animation" : "minimize-animation");

                if (this.minimized) {
                    focusProxy.focusedWindow = this;
                    this.element.style.display = "flex";
                    setTimeout(() => {
                        this.element.style.top = `${this.position.y}px`;
                        this.element.style.left = `${this.position.x}px`;
                    }, 16);
                }
                else {
                    focusProxy.focusedWindow = null;
                    this.element.style.top = "calc(100% - 200px)";
                    this.element.style.left = `${(window.innerWidth / 2) - 400}px`;
                }

                setTimeout(() => {

                    this.toggleMinimize();

                }, 200);

            }

            else {

                focusProxy.focusedWindow = this;

            }

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

        titleElement.addEventListener("mousedown", (e) => {

            this.held = true;
            EXTRAS.append(dragOutlineElement);

            this.mouseOffset = {x: e.offsetX, y: e.offsetY};

        });

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

        buttonMinimizeElement.addEventListener("click", (e) => {

            const index = WINDOWS.indexOf(this);

            if (index !== -1) {

                e.stopPropagation();

                this.element.classList.remove("open-animation", "maximize-animation");
                this.element.classList.add("minimize-animation");

                this.element.style.top = "calc(100% - 200px)";
                this.element.style.left = `${(window.innerWidth / 2) - 400}px`;

                setTimeout(() => {

                    this.toggleMinimize();

                }, 200);

            }

        });

        buttonCloseElement.addEventListener("click", (e) => {

            const index = WINDOWS.indexOf(this);

            if (index !== -1) {

                e.stopPropagation();

                this.element.classList.remove("open-animation", "minimize-animation", "maximize-animation");
                this.element.classList.add("close-animation");

                focusProxy.focusedWindow = null;

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

    updatePosition() {

        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;

    }

    toggleMinimize() {

        this.minimized = !this.minimized;

        if (this.minimized) this.element.style.display = "none";

    }

}