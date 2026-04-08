(function () {
    function getDateInput() {
        return document.getElementById('editorForm_30') || document.getElementsByName('editorForm_30')[0];
    }

    function getTitleInput() {
        return document.getElementById('subject') || document.getElementsByName('subject')[0];
    }

    function stripPrefix(text) {
        if (!text) return '';
        return text.replace(/^\[[^\]]*\]\s*/, '');
    }

    function applyTitle() {
        var dateInput = getDateInput();
        var titleInput = getTitleInput();

        if (!dateInput || !titleInput) return;

        var date = dateInput.value ? dateInput.value.trim() : '';
        var base = titleInput.value ? stripPrefix(titleInput.value).trim() : '';

        if (!date || !base) return;

        titleInput.value = '[' + date + '] ' + base;
    }

    function bind() {
        var nodes = document.getElementsByTagName('*');
        var i, el, text;

        for (i = 0; i < nodes.length; i++) {
            el = nodes[i];
            text = el.innerText || el.textContent || '';

            if (text.trim() === '결재요청') {
                if (!el.__autoTitleBound) {
                    el.__autoTitleBound = true;
                    el.onclick = (function (oldHandler) {
                        return function () {
                            applyTitle();
                            if (typeof oldHandler === 'function') {
                                return oldHandler.apply(this, arguments);
                            }
                        };
                    })(el.onclick);
                }
            }
        }
    }

    function init() {
        bind();
    }

    if (document.readyState === 'complete') {
        init();
    } else {
        window.onload = init;
    }
})();