const path = require("path");
const fs = require("fs");
const fastCsv = require("fast-csv");
const Dataset = require("./models/datasetModel");

const fileReader = (conn) => {
  const directoryPath = path.join(__dirname, "./datasetFiles");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    } else {
      let count = files.length;
      console.log("Reading files...");
      files.map((file) => {
        // Validate CSV
        if (file.split(".")[1] !== "csv") {
          console.log(`${file} is invalid csv file`);
        } else {
          console.log(`${file}`);
          const readStream = fs.createReadStream(
            "./backend/datasetFiles/" + file,
            "utf-8"
          );

          let allTrips = {};
          const tripsList = [];

          const csvStream = fastCsv
            .parse()
            .on("data", (data) => {
              allTrips = Dataset({
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
              tripsList.push(allTrips);
            })
            .on("end", async () => {
              // Remove the header
              tripsList.shift();

              // Remove duplicate entries in csv file
              // and filter trips less than 10 sec
              // or shorter than 10 meters
              //   const filteredTrips = [
              //     ...new Map(
              //       tripsList.map((item) => [item.departure, item])
              //     ).values(),
              //   ].filter(
              //     (item) => item.covered_distance_m > 10 && item.duration_sec > 10
              //   );

              const result = await conn.db;
              const fileName = file.split(".")[0];
              await result
                .collection("datasets")
                .insertMany(tripsList, (err, result) => {
                  console.log(
                    `${
                      fileName.charAt(0).toUpperCase() + fileName.slice(1)
                    } documents inserted successfully`
                  );
                  count--;
                  if (count < 1) {
                    console.log(
                      `Total number of files read: ${files.length} \nfile read complete`
                    );
                    return result;
                  } else {
                    console.log(err);
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
