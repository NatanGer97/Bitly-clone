const UserService = require("../services/User.Service");
const { sequelize } = require("../Services/DB");

const groupByDate = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const username = req.user.email;

  try {
    const user = await UserService.getUserByEmail(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let sql = `SELECT "clickedAt", "longUrl", COUNT(*) as clicks FROM clicks where "username"='${username}' `;

    if (req.query.code) {
      sql += `AND "shortUrl" = '${req.query.code}' `;
    }

    sql += `GROUP BY "clickedAt", "longUrl"`;

    const results = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getClicksSummary = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await UserService.getUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let sql = `SELECT "longUrl", COUNT(*) as clicks FROM clicks where "username"='${req.user.email}'  group by "longUrl"`;

    const queryResults = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(queryResults);
  } catch (err) {
    console.log(err);
    next(err);
  }
};



module.exports = { groupByDate, getClicksSummary, };
