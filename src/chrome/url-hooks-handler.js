
const DEVTOOLS_URL = "devtools://";

// Listen to extension init, get the initial active tab URL - when the extension is first open.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CURRENT_TAB_URL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ type: "CURRENT_TAB_URL", payload: { activeTabUrl: tabs[0].url }} );
    });
    return true; 
  }
});

// Listen to tab activation(init) - when switching to another existing tab.
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    chrome.runtime.sendMessage({ type: "CURRENT_TAB_URL", payload: { activeTabUrl: tab.url } });
  });
});

// Listen to URL changes within a tab - when the tab is refreshed.
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) {
    chrome.tabs.get(details.tabId, (tab) => {
      // Exclude devtools internal Chrome pages
      if (!tab.url.startsWith(DEVTOOLS_URL)) {
        chrome.runtime.sendMessage({ type: "CURRENT_TAB_URL", payload: { activeTabUrl: tab.url } });
      }
    });
  }
});

// Listen to in-page URL changes - when moving between pages inside the same website.
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId === 0) { 
    chrome.tabs.get(details.tabId, (tab) => {
      chrome.runtime.sendMessage({ type: "CURRENT_TAB_URL", payload: { activeTabUrl: tab.url } });
    });
  }
});