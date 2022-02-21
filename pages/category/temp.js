// var json = require("./m1");
// const fs = require("fs");
// // convert JSON object to string
// json = json.json.keywordAreas
//   .map((kwa, i) => {
//     if (i > 10) {
//       return null;
//     }
//     let { areaId, areaName, level1words } = kwa;

//     return {
//       areaId,
//       areaName,
//       level1words: level1words.map((l1) => {
//         let { keywordId, keyword, level2words } = l1;
//         return {
//           keywordId,
//           keyword,
//           level2words: level2words.map((l2) => {
//             let { keywordId, keyword, imageUrl } = l2;

//             return { keywordId, keyword, imageUrl };
//           }),
//         };
//       }),
//     };
//   })
//   .filter((val) => val);
// var data = JSON.stringify(json, null, 4);

// // write JSON string to a file
// try {
//   fs.writeFileSync("m1.json", data);
//   console.log("JSON data is saved.");
// } catch (error) {
//   console.error(err);
// }

var json = require("./m1");
const fs = require("fs");
// convert JSON object to string
json = json
  .map((kwa, i) => {
    if (i > 10) {
      return null;
    }
    let { areaId, areaName, level1words } = kwa;

    return {
      areaId,
      areaName,
      level1words: level1words.map((l1) => {
        let { keywordId, keyword, level2words } = l1;
        return {
          keywordId,
          keyword,
          level2words: level2words.map((l2) => {
            let { keywordId, keyword, imageUrl } = l2;

            return { keywordId, keyword, imageUrl };
          }),
        };
      }),
    };
  })
  .filter((val) => val);
var data = JSON.stringify(json, null, 4);

// write JSON string to a file
try {
  fs.writeFileSync("m1.json", data);
  console.log("JSON data is saved.");
} catch (error) {
  console.error(err);
}
