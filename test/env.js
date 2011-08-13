document = require("jsdom").jsdom("<html><head></head><body></body></html>", null, {features: {QuerySelector: true}});
window = document.createWindow();
navigator = window.navigator;

process.env.TZ = "America/Los_Angeles";
