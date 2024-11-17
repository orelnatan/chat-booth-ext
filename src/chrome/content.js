
const SOURCE_ORIGIN = "GLaDOS";

// Listen to signals originated from GLaDOS
window.addEventListener("message", (event) => {
  // Ignore signals not from the same window.
  if (event.source !== window) return;  
  
  // Verify that the signal broadcast from GLaDOS(and not from other entity in the current chrome window)
  if (event.data.source === SOURCE_ORIGIN) {     
    // Send the message data back to the background.js script
    chrome.runtime.sendMessage({ ...event.data });      
  }
});