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

const img1src = "public/ole-kloth-NmPpLZ_qxdM-unsplash.jpg";

const lipsum1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a scelerisque risus. Nunc porttitor nibh a justo hendrerit, vitae faucibus urna pharetra. Nulla consequat justo sit amet leo facilisis ornare. Maecenas a sodales lacus. Nam in dui iaculis est tincidunt cursus. Vestibulum in hendrerit dui. Phasellus turpis lorem, dictum eu metus ac, hendrerit lobortis dui. Praesent eget faucibus diam, eget fermentum diam. Nulla eu elit suscipit, ultricies arcu ac, ullamcorper nisl. In hac habitasse platea dictumst. Fusce sed nisi orci. In hac habitasse platea dictumst. Cras eu elit suscipit, blandit elit vitae, ornare purus. Morbi congue enim sed augue hendrerit, quis ullamcorper nisi tristique. Quisque laoreet tristique augue, id porttitor eros feugiat eget."
const lipsum2 = "Etiam convallis a lectus et elementum. Phasellus a condimentum lectus. Nulla porttitor justo ut purus molestie consequat. Fusce in pellentesque quam, non vulputate nisl. Nunc finibus finibus sagittis. Mauris dolor mi, mattis ac diam a, eleifend suscipit ante. Pellentesque odio ligula, blandit finibus volutpat et, tempus pretium nibh. Duis at pellentesque magna. Nulla fringilla, massa nec accumsan imperdiet, erat nibh cursus orci, nec gravida urna tortor id mauris. In hac habitasse platea dictumst. Nam eget fringilla libero. Vivamus ornare leo ex, id iaculis quam molestie a. Aliquam erat volutpat."
const lipsum3 = "Nunc luctus tincidunt est. Vestibulum accumsan sem eget libero malesuada, non mattis erat aliquet. Aenean mollis, dui vel lobortis aliquam, tellus urna aliquam nisi, vel ultrices eros justo mattis erat. Fusce et est a nisl vehicula consequat non et diam. In turpis nisi, sodales in ipsum nec, euismod dignissim sem. Nam est purus, aliquet quis diam id, fermentum elementum erat. Aliquam posuere, justo pretium venenatis facilisis, tortor ipsum auctor nisi, bibendum dignissim turpis felis in felis. Proin in quam ultrices, tincidunt lectus ac, fermentum quam. Duis in laoreet erat. Suspendisse condimentum nisl et posuere hendrerit. Nam egestas sapien porta enim tristique interdum. Nulla ut elit est. Cras pulvinar ex sapien, non efficitur magna laoreet eget. Ut luctus sapien et suscipit blandit. Morbi maximus pulvinar convallis."