// listen for new port creation
chrome.runtime.onConnect.addListener(function (port) {
    // assert new port name
    console.assert(port.name == "skulpt");

    // listen for port messages
    port.onMessage.addListener(function (message) {
        // if message has code
        if (message.hasOwnProperty('code')) {
            // run skulpt
            Sk.configure({
                output: function (text) {
                    console.log(text);
                    // post message to port as response
                    port.postMessage({ "outf": text })
                },
                read: builtinRead,
                __future__: Sk.python3 // enable python3 runtime
            });
    
            var timedPromise = Sk.misceval.asyncToPromise(
                function () {
                    let start = performance.now();
                    let returnValue = Sk.importMainWithBody("<stdin>", false, message.code, true);
                    let elapsed = performance.now() - start;
                    elapsed = elapsed.toFixed(2);
    
                    console.log("Elapsed: " + elapsed + "ms");
                    port.postMessage({ "outf": "Elapsed: " + elapsed + "ms" });
    
                    return returnValue;
                }
            );
    
            timedPromise.then(
                function (mod) {
                    return;
                },
                function (err) {
                    console.log(err);
                    port.postMessage({ "outf": err });
                }
            );
        }
    });
});

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}
