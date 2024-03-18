
class Window {

    constructor(title, x, y, contents) {

        this.title = title;
        this.position = {x: x, y: y};
        this.mouseOffset = {x: 0, y: 0};

        this.contents = contents;

        this.generateHTML();

        this.minimized = false;
        this.held = false;

        this.finalDragEvent = undefined;
        
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

            e.preventDefault();

            this.held = false;
            dragOutlineElement.remove();

            document.removeEventListener("mousemove", updateMouseCoords);

            this.position = {x: e.clientX - this.mouseOffset.x, y: e.clientY - this.mouseOffset.y};

            focusProxy.focusedWindow = this;

            this.updatePosition();

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

        titleElement.addEventListener("touchstart", (e) => {

            e.preventDefault();

            this.held = true;
            EXTRAS.append(dragOutlineElement);

            this.finalDragEvent = e;
            this.mouseOffset = {x: e.touches[0].clientX - this.position.x, y: e.touches[0].clientY - this.position.y};

            document.addEventListener("touchmove", updateTouchCoords);

        });

        titleElement.addEventListener("mousedown", (e) => {

            e.preventDefault();

            this.held = true;
            EXTRAS.append(dragOutlineElement);

            this.finalDragEvent = e;
            this.mouseOffset = {x: e.offsetX, y: e.offsetY};

            document.addEventListener("mousemove", updateMouseCoords);

        });

        titleElement.addEventListener("touchend", (e) => {

            e.preventDefault();

            this.held = false;
            dragOutlineElement.remove();

            document.removeEventListener("touchmove", updateTouchCoords);

            this.position = {x: this.finalDragEvent.touches[0].clientX - this.mouseOffset.x, y: this.finalDragEvent.touches[0].clientY - this.mouseOffset.y};

            focusProxy.focusedWindow = this;

            this.updatePosition();

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

        /// DEMO CONTENT ///

        const paragraphElement1 = document.createElement("p");
        const imgElement1 = document.createElement("img");
        const paragraphElement2 = document.createElement("p");
        const paragraphElement3 = document.createElement("p");

        paragraphElement1.classList.add("window-innerContent");
        paragraphElement2.classList.add("window-innerContent");
        paragraphElement3.classList.add("window-innerContent");

        paragraphElement1.innerHTML = this.contents[0];
        imgElement1.src = this.contents[1];
        paragraphElement2.innerHTML = this.contents[2];
        paragraphElement3.innerHTML = this.contents[3];

        contentElement.append(paragraphElement1);
        contentElement.append(imgElement1);
        contentElement.append(paragraphElement2);
        contentElement.append(paragraphElement3);

        /// HELPER FUNCTIONS ///

        let updateMouseCoords = (e) => {

            dragOutlineElement.style.top = `${e.clientY - this.mouseOffset.y}px`;
            dragOutlineElement.style.left = `${e.clientX - this.mouseOffset.x}px`;

        }

        let updateTouchCoords = (e) => {

            this.finalDragEvent = e;

            dragOutlineElement.style.top = `${e.touches[0].clientY - this.mouseOffset.y}px`;
            dragOutlineElement.style.left = `${e.touches[0].clientX - this.mouseOffset.x}px`;

        }

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