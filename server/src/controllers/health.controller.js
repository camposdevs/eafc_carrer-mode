function healthCheck(req, res) {
  return res.json({
    status: "ok",
    message: "EA FC Career Tracker API online"
  });
}

module.exports = { healthCheck };
