// connect db
const mongoose = require("mongoose");
const db_conf = require("./src/configs/db_conf.js");
mongoose.connect(db_conf.url);
const db = mongoose.connection;
db.on("error", (err) => {
    console.log("Error connecting to DB", err);
});
db.once("connected", () => {
    console.log("DB connected");
});

// test 
const userService = require("./src/services/userService.js");

async function test() {
    var result
    // result = await userService.initUser("107393909062077191", "keon", "keon@keon.com", 0, "");
    // console.log(result);

    // result = await userService.getUserById("test");
    // console.log(result);

    // result = await userService.nBoltPlusOne("test");

    // result = await userService.getWaitlistStatus("test2")
    console.log(result);
}

test();