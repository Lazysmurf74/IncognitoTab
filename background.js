chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "openIncognito",
      title: "Invia in finestra anonima",
      contexts: ["all"] // "all" include sia la pagina che i link
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openIncognito") {
    
    // 1. Priorit? al LINK: se l'utente ha cliccato su un collegamento
    if (info.linkUrl) {
      chrome.windows.create({ url: info.linkUrl, incognito: true });
    } 
    
    // 2. Altrimenti gestisce la PAGINA attuale
    else if (tab.url && (tab.url.startsWith('http') || tab.url.startsWith('file'))) {
      chrome.windows.create({ url: tab.url, incognito: true });
      chrome.tabs.remove(tab.id);
    }
  }
});
