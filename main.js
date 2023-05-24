const fs = require('fs');
const path = require('path');

// -------
// Config:
// -------
const translationsFile = '/home/joel/dev_blaccspot/my-bsm-tools-trans/translations.json';
const folders = ["de", "es", "fr", "ja", "ko", "pt-BR", "zh-CN", "zh-TW"];

function updateJsonKey(jsonFileToModify, dotNotationStr, translationKey) {
  const value = JSON.parse(fs.readFileSync(translationsFile)).translations[translationKey];
  
  folders.forEach((folder) => {
    const filePath = path.join(folder, jsonFileToModify);
    if (fs.existsSync(filePath)) {
      const fileContent = JSON.parse(fs.readFileSync(filePath));
      const keys = dotNotationStr.split('.');
      keys.slice(0, -1).forEach((key) => fileContent = fileContent[key]);
      fileContent[keys[keys.length - 1]] = value;
      fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
    }
  });
}

updateJsonKey(process.argv[2], process.argv[3], process.argv[4]);