window.addEventListener('load', function () {
    init();
})

var old = "";
async function detectURLchange(old, timeout) {
    // test for .py page extension
    let location_extension = window.location.href.split('.');
    let location_test = (location_extension[location_extension.length - 1] == "py");

    // detect url change (and wait on document DOM load) (and test DOM directly for content)
    if (window.location.href !== old && document.readyState === "complete" && !!document.getElementById('blob-path') && location_test) {
        old = window.location.href;
        init();
    }

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
    // run tests //
    // test for 'browser-python-tbody-id'
    let duplicate_test = !!document.getElementById('browser-python-tbody-id');

    if (!duplicate_test) {
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

    // open connection to backend
    let port = chrome.runtime.connect({ name: "skulpt" });

    // post code for eval
    port.postMessage({ code: code });

    // listen for async responses
    port.onMessage.addListener(function (response) {
        console.log(response.outf);
        if (response.hasOwnProperty('outf')) {
            outf(response.outf);
        }
    });
}