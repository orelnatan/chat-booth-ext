
// Allows users to open the chrome side-panel by clicking on the action toolbar icon.
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Allows the extension to be shown under the right-click chrome menu. 
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openSidePanel",
    title: "Open ChatBooth",
    contexts: ["all"]
  })
})

// Allows the extension to be open from the right-click chrome menu.
chrome.contextMenus?.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "openSidePanel") {
    await chrome.sidePanel.open({ tabId: tab.id, windowId: tab.windowId })
  }
})

// Listen for tab activation(init) - when switching to another existing tab.
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    chrome.runtime.sendMessage({ activeTabUrl: tab.url });
  });
});

// Listen for extension init, get the initial active tab URL - when the extension is first open.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getCurrentTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ activeTabUrl: tabs[0].url });
    });
    return true; 
  }
});

// Listen for URL changes within a tab - when the tab is refreshed.
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) {
    chrome.tabs.get(details.tabId, (tab) => {
      // Exclude devtools internal Chrome pages
      if (!tab.url.startsWith("devtools://")) {
        chrome.runtime.sendMessage({ activeTabUrl: tab.url });
      }
    });
  }
});

// Listen for in-page URL changes - when moving between pages inside the same website.
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId === 0) { 
    chrome.tabs.get(details.tabId, (tab) => {
      chrome.runtime.sendMessage({ activeTabUrl: tab.url });
    });
  }
});