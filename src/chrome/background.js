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
  if (message.type === 'GOOGLE_LOGIN_INIT') {
    chrome.tabs.create({ url: GOOGLE_LOGIN_URL }, tab => {
      activeLoginTabId = tab.id;
    });
  }
});

// Listen to external signals - GLaDOS authorized only.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.source !== SOURCE_ORIGIN) return;

  if(message.type === "ACCESS_GRANTED") {
    chrome.runtime.sendMessage({ type: "LOGIN_SUCCESS", payload: { ...message.payload }});
  }

  if(message.type === "ACCESS_DENIED") {
    chrome.runtime.sendMessage({ type: "LOGIN_FAILED", payload: { ...message.payload }});
  }

  chrome.tabs.remove(activeLoginTabId);
});