const dashboardService = require("../services/dashboard.service");

async function getSummary(req, res) {
  try {
    const summary = await dashboardService.getSummary(req.user.id);

    return res.json(summary);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getSummary
};