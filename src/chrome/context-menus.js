
const CONTEXT_MENUS_ID = "openSidePanel";
const CONTEXT_MENUS_TITLE = "Open ChatBooth";
const CONTEXT_MENUS_ALL = "all";

// Allows the extension to be shown under the right-click chrome menu. 
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENUS_ID,
    title: CONTEXT_MENUS_TITLE,
    contexts: [CONTEXT_MENUS_ALL]
  })
})

// Allows the extension to be open from the right-click chrome menu.
chrome.contextMenus?.onClicked.addListener((info, tab) => {
  if (info.menuItemId === CONTEXT_MENUS_ID) {
    chrome.sidePanel.open({ tabId: tab.id, windowId: tab.windowId })
  }
})