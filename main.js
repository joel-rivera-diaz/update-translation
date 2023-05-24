const fs = require('fs');
const path = require('path');

// =============================
// ------ CONFIGURATION --------
// =============================
// ===> CHANGE THIS...
// ...set this to the correct location in you computer
// const translationsFile = '/home/joel/dev_blaccspot/my-bsm-tools-trans/translations.json';
// ===> CHANGE THIS...
// ...if you need to add/remove a translation folder
const folders = ["de", "es", "fr", "ja", "ko", "pt-BR", "zh-CN", "zh-TW"];

// ----------------------------------------------------------
// ----------------------------------------------------------

function updateJsonKey(jsonFileToModify, dotNotationString) {
  let valuesJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'translations.json')));

  folders.forEach((folder) => {
    const value = valuesJson[folder]
    const filePath = path.join(folder, jsonFileToModify);

    if (fs.existsSync(filePath)) {
      // yes! it exists!
      console.log(`file exists -- folder: ${folder}`);

      // get file
      let jsonObj = JSON.parse(fs.readFileSync(filePath));

      // Get the 'old' value that will be modified
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

      fs.writeFileSync(filePath, JSON.stringify(jsonObj, null, 2));
      console.log(`Property "${dotNotationString}" modified.`);

    } else {
      console.log(`no file found -- folder: ${folder}`);
    }
  });
}

updateJsonKey(process.argv[2], process.argv[3]);