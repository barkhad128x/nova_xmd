/**
 * NOVA XMD - Configuration File
 */

export const config = {
  // Bot Identity
  botName: 'NOVA XMD',
  version: '2.0.0',
  prefix: '.',
  
  // Owner Phone Number(s) - Format: countrycode + number (no +, no spaces)
  // Tusaale: '252611234567' (Halkan ku qor lambarkaaga WhatsApp)
  ownerNumbers: ['252611234567'],
  
  // Server Port for Express API
  port: process.env.PORT || 3000,
  
  // Storage Directory for Persistent Sessions (Folder-ka keydinta xogta isku-xirka)
  sessionDir: './sessions',
  
  // Anti View Once Settings
  antiViewOnce: {
    enabled: true,
    sendToOwner: true,         // U dir feylka milkiilaha chat-kiisa
    sendToSavedMessages: true,  // Bot-ku ha isugu diro chat-kiisa gaarka ah
    captionPrefix: '⚡ *[NOVA XMD - VIEW ONCE RECOVERED]*\n'
  },
  
  // Status Saver Settings
  statusSaver: {
    enabled: true,
    // Trigger keywords marka qofka status-kiisa lagu soo jawaabo
    keywords: ['send', 'send me', 'ii soo dir', 'soo dir', 'yourself', 'status', 'save', 'dp']
  }
};
