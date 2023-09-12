let headers = [];

// Fetch headers from storage when the background script starts
browser.storage.local.get("headers", (result) => {
    if (result.headers) {
        headers = result.headers;
    }
});

// Listen to storage changes to update our headers in the background script
browser.storage.onChanged.addListener((changes, namespace) => {
    if (changes.headers) {
        headers = changes.headers.newValue;
    }
});

// Function to handle headers modification for each request
function handleHeaders(details) {
    const modifiedHeaders = [...details.requestHeaders];

    headers.forEach(header => {
        if (header.enabled) {
            modifiedHeaders.push({name: header.key, value: header.value});
        }
    });

    return {requestHeaders: modifiedHeaders};
}

// Add the listener that will intercept requests and modify headers
browser.webRequest.onBeforeSendHeaders.addListener(
    handleHeaders,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);
