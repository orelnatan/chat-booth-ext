import './context-menus-handler.js';
import './side-panel-handler.js';
import './url-hooks-handler.js';

let activeLoginTabId;

const SOURCE_ORIGIN = "GLaDOS";
const GOOGLE_LOGIN_URL = "http://localhost:4200/auth/login-with-google";

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
  if(message.source === SOURCE_ORIGIN) {  
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
