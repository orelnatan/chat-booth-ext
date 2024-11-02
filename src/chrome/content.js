
const ORIGIN = "GLaDOS";

// Listen to signals originated from GLaDOS
window.addEventListener("message", (event) => {
  if (event.source !== window) return;  // Ignore signals not from the same window.
  
  // Verify that the signal broadcast from GLaDOS(and not from other entity in the current chrome window)
  if (event.data.source === ORIGIN) {     
    // Send the message data back to the background.js script
    chrome.runtime.sendMessage({ ...event.data });      
  }
});