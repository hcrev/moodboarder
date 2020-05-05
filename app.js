let controller = {
    init: function () {
        view.init();
        view.initMacy();
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
        this.dropZone = document.querySelector('#drop-zone');

        this.dropZone.ondrop = function (e) {
            e.preventDefault();

            // Hide the dropzone to interact with the div below...

            document.querySelector('#drop-zone p').className = 'hidden';
            document.querySelector('#drop-zone h3').className = 'hidden';
            document.querySelector('#drop-zone').className = 'panel hidden';

            // ...but unhide when dragging new images in
            document.ondragover = function () {
                document.querySelector('#drop-zone').className = 'panel';
                document.querySelector('#drop-zone p').className = 'hidden';
                document.querySelector('#drop-zone h3').className = 'hidden';
            }
            document.ondragleave = function () {
                document.querySelector('#drop-zone').className = 'panel hidden';
            }
            controller.startUpload(e.dataTransfer.files)
        };
        this.dropZone.ondragover = function () {
            return false;
        };
        this.dropZone.ondragleave = function () {
            return false;
        };

    },

    appendImg: function (file, type, name) {
        if (type.match('image.*')) {
            this.newContainer = document.createElement('div');
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
                    // get first item (filename div) of container
                    view.currentFileName = this.children[0];
                    // show filename
                    view.currentFileName.className = 'filename';
                }
            })(name)
            // hide filename
            this.newContainer.onmouseout = function () {
                view.currentFileName.className = 'filename hidden';
            }
            this.newImg.onload = function () {
                window.URL.revokeObjectURL(this.src);
            };
        } else {
            alert(name + "\n\nUnsupported filetype: " + type + "\nOnly images allowed.");
            //return window.location.href = window.location.href;
        }

        this.newImgNameContainer.append(this.newImgName);
        this.newContainer.append(this.newImgNameContainer, this.newImg);
        document.querySelector('#macy-container').append(this.newContainer);
        controller.currentFile++;
        if (controller.currentFile == controller.fileLength) {
            view.prog.outerHTML = '';
            view.macy.recalculate(true);
        } else {
            view.prog.firstChild.innerHTML = 'Loading... ' + controller.currentFile + ' / ' + controller.fileLength;
        }


    },

    initMacy: function () {
        this.macy = Macy({
            container: '#macy-container',
            columns: 4,
            margin: -1
        })
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
                    view.macy.options.columns = 1;
                    break;
                case 50:
                    view.macy.options.columns = 2;
                    break;
                case 51:
                    view.macy.options.columns = 3;
                    break;
                case 52:
                    view.macy.options.columns = 4;
                    break;
                case 53:
                    view.macy.options.columns = 5;
                    break;
                case 54:
                    view.macy.options.columns = 6;
                    break;
                case 68:
                    // The d key removes the element that the mouse is currently on
                    console.log(view.currentImage);
                    view.currentImage.remove();
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
                        document.getElementById('macy-container').children.length > 0 ? dropzone.className = 'panel help' : dropzone.className = 'panel';
                    }
                    break;
            }
            view.macy.recalculate(true);
        };
    }
}

controller.init();
