const Entry = require('../models/Entry');

exports.getLatestEntries = async (req, res) => {
  const userData = req.body;
  try {
    const latestEntries = await Entry.getLatestEntries(userData);
    res.json(latestEntries);
  } catch (err) {
    throw new Error(err);
  }
}