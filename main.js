const fs = require('fs');
const path = require('path');

// -------
// Config:
// -------
const translationsFile = '/home/joel/dev_blaccspot/my-bsm-tools-trans/translations.json';
const folders = ["de", "es", "fr", "ja", "ko", "pt-BR", "zh-CN", "zh-TW"];

function updateJsonKey(jsonFileToModify, dotNotationString) {
  folders.forEach((folder) => {

    // get value to assign
    const value = JSON.parse(fs.readFileSync(translationsFile))[folder]
    
    const filePath = path.join(folder, jsonFileToModify);

    if (fs.existsSync(filePath)) {
      // yes! it exists!
      console.log('file exists');

      // get file
      let jsonObj = JSON.parse(fs.readFileSync(filePath));
      console.log({
        jsonObj
      });

      // Get the value that will be modified using the dot notation string
      const valueToModify = dotNotationString.split('.').reduce((obj, key) => obj[key], jsonObj);
      
      // if the property exists...
      // ...assign the new value to the specified property
      if (valueToModify) {
        dotNotationString.split('.').reduce((obj, key, i, arr) => {
          if (i === arr.length - 1) {
            obj[key] = value;
          }
          return obj[key];
        }, jsonObj);
      } else {
        console.log();
      }

      // Write the modified JSON back to the file
      fs.writeFileSync(filePath, JSON.stringify(jsonObj, null, 2));

      console.log(`Property "${dotNotationString}" modified.`);
    } else {
      console.log('no file found');
    }
  });
}

updateJsonKey(process.argv[2], process.argv[3]);