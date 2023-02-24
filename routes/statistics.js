const router = require("express").Router();
const StatsController = require("../controllers/Stats.Controller");

router.get("/groupByDate", StatsController.groupByDate);

module.exports = router;
