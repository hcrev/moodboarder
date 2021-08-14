let controller = {
    init: function () {
        view.init();
        view.initPackery();
        window.URL = window.URL || window.webkitURL;
    },
    startUpload: function (files) {
        this.fileLength = files.length;
        this.currentFile = 0;
        view.initProgress(files.length);
        let interval = setInterval(function () {
            let i = controller.currentFile;
            view.appendImg(window.URL.createObjectURL(files[i]), files[i].type, files[i].name);
            i++;
            if (i >= files.length) clearInterval(interval);
        }, 10);
    }

}

let view = {
    init: function () {
        this.dropzone = document.querySelector('#drop-zone');
        this.header = document.querySelector('#drop-zone h3');
        this.help = document.querySelector('#drop-zone p');
        // Timer used to delay the ondragleave from firing every 100ms or so. Fixes flickering in Safari and Chrome.
        view.dragTimer;
        console.log(this.dropzone, this.help, this.header);

        this.dropzone.ondrop = function (e) {
            e.preventDefault();
            let dt = e.dataTransfer;
            // Hide the dropzone to interact with the div below...
            view.dropzone.className = 'panel hidden';
            view.header.className = 'hidden';
            view.help.className = 'hidden';

            // ...but unhide when dragging new images in
            document.ondragover = function () {
                window.clearTimeout(view.dragTimer);
                view.dropzone.className = 'panel';
                view.header.className = 'hidden';
                view.help.className = 'hidden';
            }
            document.ondragleave = function () {
                window.clearTimeout(view.dragTimer);
                view.dragTimer = window.setTimeout(function () {
                    view.dropzone.className = 'panel hidden';
                }, 85);

            }
            if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))){
              controller.startUpload(dt.files);
            }
        };
        this.dropzone.ondragover = function () {
            return false;
        };
        this.dropzone.ondragleave = function () {
            return false;
        };

    },

    appendImg: function (file, type, name) {
        if (type.match('image.*')) {
            this.newContainer = document.createElement('div');
            this.newContainer.className = 'grid-item';
            this.newImgNameContainer = document.createElement('div');
            this.newImgNameContainer.className = 'filename hidden';
            this.newImgName = document.createElement('span');
            this.newImgName.innerHTML = name;
            this.newImg = document.createElement('img');
            this.newImg.setAttribute('src', file);
            this.newContainer.onmouseover = (function (n) {
                return function () {
                    // get container that mouse is on and store it globally
                    view.currentImage = this;
                }
            })(name)
            this.newImg.onload = function () {
                window.URL.revokeObjectURL(this.src);
            };
        } else {
            alert(name + "\n\nUnsupported filetype: " + type + "\nOnly images allowed.");
        }

        this.newImgNameContainer.append(this.newImgName);
        this.newContainer.append(this.newImgNameContainer, this.newImg);
        document.querySelector('#packery-container').append(this.newContainer);
        this.packery.appended(this.newContainer);
        console.log('adding new file');
        controller.currentFile++;
        if (controller.currentFile == controller.fileLength) {
            view.prog.outerHTML = '';
            view.packery.layout();
        } else {
            view.prog.firstChild.innerHTML = 'Loading... ' + controller.currentFile + ' / ' + controller.fileLength;
        }


    },

    initPackery: function () {
        this.grid = document.querySelector('#packery-container');
        this.packery = new Packery( this.grid, {
            itemSelector: '.grid-item',
            percentPosition: true
        });

        this.addKeyListeners();
    },

    initProgress: function () {
        this.prog = document.createElement('div');
        this.prog.className = 'prog';
        this.prog.innerHTML = '<p>Loading...' + controller.currentFile + ' / ' + controller.fileLength + '</p>';
        document.querySelector('body').appendChild(this.prog);
        this.prog = document.querySelector('.prog');
    },

    addKeyListeners: function () {
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                // 49-54 = 1-6: for column layout
                case 49:
                    view.col_width = 1;
                    break;
                case 50:
                    view.col_width = 2;
                    break;
                case 51:
                    view.col_width = 3;
                    break;
                case 52:
                    view.col_width = 4;
                    break;
                case 53:
                    view.col_width = 5;
                    break;
                case 54:
                    view.col_width = 6;
                    break;
                case 68:
                    // The d key removes the element that the mouse is currently on
                    view.packery.remove(view.currentImage);
                    view.packery.layout();
                    break;
                case 73:
                    // The i key shows name of the element that the mouse is currently on
                    // get first item (filename div) of container
                    view.currentFileName = view.currentImage.children[0];
                    // show filename
                    view.currentFileName.className = (view.currentFileName.className === 'filename hidden') ? 'filename' : 'filename hidden';
                    break;
                case 72:
                    // The h key toggle the help menu
                    let dropzone = document.querySelector('#drop-zone');
                    if (!dropzone.classList.contains('hidden')) {
                        document.querySelector('#drop-zone p').className = 'hidden';
                        document.querySelector('#drop-zone h3').className = 'hidden';
                        dropzone.className = 'panel hidden';
                    } else {
                        document.querySelector('#drop-zone p').className = '';
                        document.querySelector('#drop-zone h3').className = '';
                        document.getElementById('packery-container').children.length > 0 ? dropzone.className = 'panel help' : dropzone.className = 'panel';
                    }
                    break;
            }
            // update global variable in css
            document.documentElement.style.cssText = `--grid-cols: ${view.col_width}`;
            view.packery.layout();
        };
    }
}

controller.init();
