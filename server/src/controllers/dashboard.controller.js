const dashboardService = require("../services/dashboard.service");

async function summary(req, res) {
  try {
    const data = await dashboardService.getDashboardSummary(req.user.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function goalsByCareer(req, res) {
  try {
    const data = await dashboardService.getGoalsByCareer(req.user.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function resultsByCareer(req, res) {
  try {
    const data = await dashboardService.getResultsByCareer(req.user.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function transfersByCareer(req, res) {
  try {
    const data = await dashboardService.getTransfersByCareer(req.user.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  summary,
  goalsByCareer,
  resultsByCareer,
  transfersByCareer
};