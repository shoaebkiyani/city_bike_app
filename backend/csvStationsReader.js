const path = require("path");
const fs = require("fs");
const fastCsv = require("fast-csv");
const Station = require("./models/stationsModel");

const fileReader = (conn) => {
  const directoryPath = path.join(__dirname, "./csvFilesStations");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    } else {
      let count = files.length;
      console.log("Reading files...");
      files.map((file) => {
        /* Validate CSV */
        if (file.split(".")[1] !== "csv") {
          console.log(`${file} is invalid csv file`);
        } else {
          const readStream = fs.createReadStream(
            "./backend/csvFilesStations/" + file,
            "utf-8"
          );
          console.log(`${file}`);

          let allStations = {};
          const stationsList = [];

          const csvStream = fastCsv
            .parse({
              delimiter: ",",
              quote: '"',
            })
            .on("data", (data) => {
              allStations = Station({
                fid: data[0],
                id: data[1],
                nimi: data[2],
                namn: data[3],
                name: data[4],
                osoite: data[5],
                adress: data[6],
                kaupunki: data[7],
                stad: data[8],
                operaattor: data[9],
                kapasiteet: data[10],
                x: data[11],
                y: data[12],
              });
              stationsList.push(allStations);
            })
            .on("end", async () => {
              /* Remove the header */
              stationsList.shift();

              const result = await conn.db;
              const fileName = file.split(".")[0];
              await result
                .collection("stations")
                .insertMany(stationsList, (err, result) => {
                  console.log(
                    `${
                      fileName.charAt(0).toUpperCase() + fileName.slice(1)
                    } documents inserted successfully`
                  );
                  count--;
                  if (count < 1) {
                    console.log(
                      `Total number of Stations files read: ${files.length} \nStation file read complete`
                    );
                    return result;
                  }
                });
            })
            .on("err", () => {
              console.log(err);
            });
          readStream.pipe(csvStream);
        }
      });
    }
  });
};

module.exports = fileReader;
