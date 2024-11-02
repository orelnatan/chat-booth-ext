let activeLoginTabId;

const ORIGIN = "GLaDOS";

const GOOGLE_LOGIN_URL = "http://localhost:4200/auth/login-with-google";

const CONTEXT_MENUS_ID = "openSidePanel";
const CONTEXT_MENUS_TITLE = "Open ChatBooth";
const CONTEXT_MENUS_ALL = "all";

// Allows users to open the chrome side-panel by clicking on the action toolbar icon.
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Allows the extension to be shown under the right-click chrome menu. 
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENUS_ID,
    title: CONTEXT_MENUS_TITLE,
    contexts: [CONTEXT_MENUS_ALL]
  })
})

// Allows the extension to be open from the right-click chrome menu.
chrome.contextMenus?.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === CONTEXT_MENUS_ID) {
    await chrome.sidePanel.open({ tabId: tab.id, windowId: tab.windowId })
  }
})

// Listen to registered external tabs close events.
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (tabId === activeLoginTabId) {
    activeLoginTabId = null; 

    chrome.runtime.sendMessage({ type: "LOGIN_SESSION_CLOSED" });
  }
});

// Listen to social media login actions - Google/Facebook/Apple etc...
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GOOGLE_LOGIN') {
    chrome.tabs.create({ url: GOOGLE_LOGIN_URL}, tab => {
      activeLoginTabId = tab.id;
    });
  }
});

// Listen to external signals from GLaDOS...
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Verify that the signal originated from GLaDOS(and not from other entity in background.js file)
  if(message.source === ORIGIN) {  
    if(message.type === "LOGIN_SUCCESS") {
      sendResponse(message);
    }

    if(message.type === "LOGIN_FAILED") {
      sendResponse(message);
    }
    // Close GLaDOS after login resposne.
    chrome.tabs.remove(activeLoginTabId);
  }
});
