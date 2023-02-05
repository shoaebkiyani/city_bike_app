const path = require("path");
const fs = require("fs");
const fastCsv = require("fast-csv");
const Trip = require("./models/tripsModel");

const fileReader = (conn) => {
  const directoryPath = path.join(__dirname, "./csvFilesTrips");

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
          console.log(`${file}`);
          const readStream = fs.createReadStream(
            "./backend/csvFilesTrips/" + file,
            "utf-8"
          );

          let allTrips = {};
          const tripsList = [];

          const csvStream = fastCsv
            .parse()
            .on("data", (data) => {
              allTrips = Trip({
                departure_date: data[0],
                return_date: data[1],
                departure_station_id: data[2],
                departure_station_name: data[3],
                return_station_id: data[4],
                return_station_name: data[5],
                covered_distance_m: data[6],
                duration_sec: data[7],
              });
              tripsList.push(allTrips);
            })
            .on("end", async () => {
              /* Remove the header */
              tripsList.shift();

              /* Remove duplicate entries in csv file
               and filter trips less than 10 sec
               or shorter than 10 meters */
              const filteredTrips = [
                ...new Map(
                  tripsList.map((item) => [item.departure_date, item])
                ).values(),
              ].filter(
                (item) => item.covered_distance_m > 10 && item.duration_sec > 10
              );

              const result = await conn.db;
              const fileName = file.split(".")[0];
              await result
                .collection("trips")
                .insertMany(filteredTrips, (err, result) => {
                  console.log(
                    `${
                      fileName.charAt(0).toUpperCase() + fileName.slice(1)
                    } documents inserted successfully`
                  );
                  count--;
                  if (count < 1) {
                    console.log(
                      `Total number of Trips files read: ${files.length} \nTrips file read complete`
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
