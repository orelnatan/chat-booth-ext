import './context-menus-handler.js';
import './side-panel-handler.js';
import './url-hooks-handler.js';

let activeLoginTabId;

const SOURCE_ORIGIN = "GLaDOS";
const GOOGLE_LOGIN_URL = "http://localhost:4200/auth/login-with-google";

// Listen to social media login actions - Google/Facebook/Apple etc...
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GOOGLE_LOGIN_INIT') {
    chrome.tabs.create({ url: GOOGLE_LOGIN_URL }, tab => {
      activeLoginTabId = tab.id;
    });
  }
});

// Listen to registered external tabs close events.
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (tabId === activeLoginTabId) {
    activeLoginTabId = null; 

    chrome.runtime.sendMessage({ type: "LOGIN_SESSION_CLOSED" });
  }
});

// Listen to external signals o-n-l-y from GLaDOS.
chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
  if(message.source !== SOURCE_ORIGIN) return;

  if(message.type === "ACCESS_GRANTED") {
    await chrome.storage.local.set({ ...message.payload });

    chrome.runtime.sendMessage({ type: "LOGIN_SUCCESS", payload: { ...message.payload }});
  }

  if(message.type === "ACCESS_DENIED") {
    chrome.runtime.sendMessage({ type: "LOGIN_FAILED", payload: { ...message.payload }});
  }

  chrome.tabs.remove(activeLoginTabId);
});


