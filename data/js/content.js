window.addEventListener('load', function () {
    init();
})

async function detectURLchange(old, timeout) {

    if (window.location.href !== old) {
        init();
    }

    old = window.location.href;

    setTimeout(() => {
        detectURLchange(old, timeout);
    }, timeout);
}

detectURLchange("_", 100);

window.addEventListener('popstate', function (event) {
    init();
}, false);



// initialise global vars
var lineLength = 1;

function init() {
    // test to prevent duplicate elements //
    let test = !!document.getElementById('browser-python-tbody-id');

    if (!test) {
        // initialise css //
        const browser_python_css = `
.browser-python-header {
    display: flex !important;
    padding-bottom: 8px !important;
    padding-top: 8px !important;
    padding-right: 8px !important;
    flex-direction: row !important;

    flex-shrink: 0 !important;
    align-items: center !important;
    background-color: #f6f8fa;
    border: 1px solid #d0d7de;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    margin: -1px -1px 0;
    padding: 16px;
    box-sizing: border-box;
    color: #24292f;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI Variable, Segoe UI, system-ui, ui-sans-serif, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 14px;
    line-height: 1.5;
}

.browser-python-button {
    float: right;
    display: inline;
    margin-left: 8px;
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15) !important;
    box-shadow: rgba(27, 31, 35, 0.04), rgba(255, 255, 255, 0.25);
    color: #24292e;
    transition: .2s cubic-bezier(.3, 0, .5, 1) !important;
    transition-property: color, background-color, border-color;
    appearance: none;
    border: 1px solid;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 5px 16px;
    position: relative;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    text-decoration: none !important;
    box-sizing: border-box;
    word-wrap: break-word;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
}

.browser-python-button:hover {
    background-color: #f3f4f6;
    border-color: rgba(27, 31, 35, 0.15) !important;
    transition-duration: .1s;
    outline-width: 0;
    text-decoration: none;
}

.browser-python {
    margin-top: 16px !important;
    position: relative !important;
    background-color: #fff;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    box-sizing: border-box;
    display: block;
    word-wrap: break-word;
    color: #24292f;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI Variable, Segoe UI, system-ui, ui-sans-serif, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 14px;
    line-height: 1.5;
}

.browser-python-table {
    background: #fff;
    border: 0;
    color: #333;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
    margin-bottom: 2px;
    margin-left: 1px;
    margin-right: 1px;
    padding: 0;
    border-spacing: 0;
    display: table;
    word-wrap: normal;
    box-sizing: inherit;
    border-collapse: collapse;
}

.browser-python-tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

.browser-python-tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

.browser-python-line-number {
    background: transparent;
    padding: 1px 10px !important;
    min-width: inherit;
    color: #6e7781;
    cursor: pointer;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
    line-height: 20px;
    border-radius: 6px;
    text-align: right;
    user-select: none;
    vertical-align: top;
    white-space: nowrap;
    width: 1%;
    word-wrap: normal;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    border-radius: 6px 6px 0 0;
    overflow: auto;
    text-indent: initial;
    border-spacing: 0;
    margin: 0;
    padding: 0;
    border: 0;
    border-collapse: collapse;
    box-sizing: inherit;
    display: table-cell;
    min-width: 50px;
    padding-left: 10px;
    padding-right: 10px;
}

.browser-python-line-text {
    border: 0;
    text-align: left;
    background: transparent;
    padding: 1px 10px !important;
    word-wrap: normal;
    color: #24292e;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
    overflow: visible;
    white-space: pre;
    line-height: 20px;
    position: relative;
    vertical-align: top;
    display: table-cell;
    margin: 0;
    box-sizing: inherit;
    border-collapse: collapse;
    font-weight: 400;
    border-spacing: 0;   
}

.browser-python-body {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    margin-bottom: -1px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 !important;
    border-bottom: 1px solid #d0d7de;
    box-sizing: border-box;
    display: block;
    word-wrap: break-word;
    color: #24292f;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI Variable, Segoe UI, system-ui, ui-sans-serif, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    border-radius: 6px;
}

.browser-python-header-left {
    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;
    font-size: 12px!important;
    padding-right: 16px!important;
    order: 1!important;
    flex: auto!important;
    display: block;
    box-sizing: border-box;
    word-wrap: break-word;
    line-height: 1.5;
    color: #24292f;
}

.browser-python-header-right {
    display: flex!important;
    padding-bottom: 0!important;
    padding-top: 0!important;
    order: 2!important;
    flex-grow: 0!important;
    justify-content: space-between!important;
    box-sizing: border-box;
    word-wrap: break-word;
    color: #24292e;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI Variable,Segoe UI,system-ui,ui-sans-serif,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    font-size: 14px;
    line-height: 1.5;
}
`;

        // insert custom css for button //
        // create an element
        const style = document.createElement('style');

        // add CSS styles
        style.innerHTML = browser_python_css;

        // append to DOM
        document.head.appendChild(style);

        // construct the python output terminal //
        let span = document.createElement('a');
        span.classList.add("browser-python-button");
        span.innerText = "Run in browser"
        span.onclick = function () {
            getScriptRaw();
        }

        let div = document.createElement('div');
        div.className = "browser-python";

        let table = document.createElement('table');
        table.className = "browser-python-table";

        let body = document.createElement('div');
        body.className = "browser-python-body";

        let header = document.createElement('div');
        header.className = "browser-python-header";

        let header_left = document.createElement('div');
        header_left.className = "browser-python-header-left";
        header_left.innerHTML = "Powered by Skulpt | Timeit: ";

        let timeit = document.createElement('span');
        timeit.id = "browser-python-timeit";
        timeit.innerText = "-ms";

        let header_right = document.createElement('div');
        header_right.className = "browser-python-header-right";

        let tbody = document.createElement('tbody');
        tbody.className = "browser-python-tbody";
        tbody.id = "browser-python-tbody-id";
        // add a hidden table row, to prevent table being empty and causing display issues
        tbody.innerHTML = "<tr><td style='visibility:hidden'>.</td></tr>";

        header_left.append(timeit);
        header_right.append(span);

        header.append(header_left);
        header.append(header_right);

        table.append(tbody);

        body.append(table);

        div.append(header);
        div.append(body);

        // insert into DOM
        let childchild = document.getElementById('blob-path');
        let child = childchild.parentElement;
        let parent = child.parentElement;

        // hacky index-trick to insert into correct position within the page
        parent.insertBefore(div, parent.children[3]);
    }
}

function outf(text) {
    let tbody = document.getElementById("browser-python-tbody-id");

    let tr = document.createElement("tr");

    let td_lineNumber = document.createElement("td");
    td_lineNumber.className = "browser-python-line-number";
    td_lineNumber.innerText = lineLength;
    lineLength++;

    let td_lineText = document.createElement("td");
    td_lineText.className = "browser-python-line-text";
    td_lineText.innerText = text;

    tr.append(td_lineNumber);
    tr.append(td_lineText);

    tbody.append(tr);
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

async function getScriptRaw() {
    let tbodyList = document.getElementsByTagName('tbody');
    let tbody = tbodyList[1];

    let raw = tbody.innerText;
    raw = raw.replace(/^\t/gm, ''); // strip the /t character GitHub appends to code in the innertext;

    python3BrowserRuntime(raw);
}

function python3BrowserRuntime(code) {
    // clear output
    let tbody = document.getElementById("browser-python-tbody-id");
    tbody.innerHTML = "";
    lineLength = 1; // reset line counter

    Sk.configure({
        output: outf,
        read: builtinRead,
        __future__: Sk.python3 // enable python3 runtime
    });

    var timedPromise = Sk.misceval.asyncToPromise(
        function () {
            let start = performance.now();
            let returnValue = Sk.importMainWithBody("<stdin>", false, code, true);
            let elapsed = performance.now() - start;

            let timeit = document.getElementById('browser-python-timeit');
            timeit.innerText = elapsed.toFixed(2) + "ms";

            return returnValue;
        }
    );

    timedPromise.then(
        function (mod) {
            console.log('success');
        },
        function (err) {
            console.log(err.toString());
            outf(err);
        }
    );
}
