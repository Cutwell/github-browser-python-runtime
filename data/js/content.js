window.addEventListener('load', function () {
    init();
})

// initialise global vars
var lineLength = 1;

function init() {
    // insert custom css for button //
    // create an element
    const style = document.createElement('style');

    // add CSS styles
    style.innerHTML = `
        .browser-python-header {
            background-color: rgba(234, 238, 242, 0.5);
            border: 1px solid #d0d7de;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            margin: -1px -1px 0;
            padding: 16px;
            box-sizing: border-box;
            display: block;
            overflow: hidden;
            word-wrap: break-word;
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
            font-size: 14px;
            line-height: 1.5;
        }

        .browser-python-button {
            display: block;
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
            overflow-x: auto;
            overflow-y: hidden;
            margin: 0;
            padding: 0;
            box-sizing: inherit;
            display: block;
            word-wrap: normal;
            background-color: #fff;
            overflow: auto;
            font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
            margin-bottom: 1em;
            font-style: normal;
            font-weight: normal;
            line-height: 1.5;
            cursor: auto;
            background: #ffffff;
            margin: 0;
            padding: 0;
            position: relative;
            border: 1px solid;
            border-color: #ddd #ddd #ccc;
            border-radius: 6px;
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
            color: rgba(27, 31, 25, 0.3);
            cursor: pointer;
            font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
            font-size: 12px;
            line-height: 20px;
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
    `;

    // append to DOM
    document.head.appendChild(style);

    // construct the python output terminal //
    let div = document.createElement('div');
    div.className = "browser-python";

    let table = document.createElement('table');
    table.className = "browser-python-table";

    let header = document.createElement('div');
    header.className = "browser-python-header";
    header.innerText = "Powered by Skulpt!"

    let tbody = document.createElement('tbody');
    tbody.className = "browser-python-tbody";
    tbody.id = "browser-python-tbody-id";

    table.append(tbody);

    div.append(header);
    div.append(table);

    // insert into DOM
    let childchild = document.getElementById('blob-path');
    let child = childchild.parentElement;
    let parent = child.parentElement;

    // hacky index-trick to insert into correct position within the page
    parent.insertBefore(div, parent.children[3]);

    // contruct the additional button //
    const a_element = document.createElement('a');

    a_element.classList.add("browser-python-button");

    let a_text = document.createTextNode("Run in browser");
    a_element.appendChild(a_text);

    a_element.onclick = function () {
        getScriptRaw();
    }

    // insert into DOM
    // get child of navigation
    let nav_child = document.getElementById("blob-path");
    // get parent for insertion
    let nav = nav_child.parentElement;

    // insert element
    if (nav !== undefined) {
        nav.append(a_element);
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

function success (status, text) {
    console.log(status, text);
}

function python3BrowserRuntime(code) {
    // clear output
    let tbody = document.getElementById("browser-python-tbody-id");
    tbody.innerHTML = "";
    lineLength = 1; // reset line counter
    //Ske.pre = "browser-python-tbody-id"; // unsure what this line achieves in the example code.. if uncommented raises "Ske is not defined" error

    Sk.configure({
        output: outf,
        read: builtinRead,
        __future__: Sk.python3 // enable python3 runtime
    });

    // uncomment to enable turtle graphics
    // NOTE: requires additional canvas object in DOM
    //(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';

    var myPromise = Sk.misceval.asyncToPromise(
        function () {
            return Sk.importMainWithBody("<stdin>", false, code, true);
        }
    );

    myPromise.then(
        function (mod) {
            console.log('success');
        },
        function (err) {
            console.log(err.toString());
            outf(err);
        }
    );
}
