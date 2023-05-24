const fs = require('fs');
const path = require('path');

// ===> CHANGE THIS:
// ...if you need to add or remove a translation language folder
const folders = ["de", "es", "fr", "ja", "ko", "pt-BR", "zh-CN", "zh-TW"];

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
        console.log('property to modify NOT found');
      }

      fs.writeFileSync(filePath, JSON.stringify(jsonObj, null, 2));
      console.log(`Property "${dotNotationString}" modified.`);

    } else {
      console.log(`file NOT found -- folder: ${folder}`);
    }
  });
}

updateJsonKey(process.argv[2], process.argv[3]);