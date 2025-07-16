const mongoose = require("mongoose");

const initDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_ACCESS);
    console.log("DB Connected");
  } catch (error) {
    console.log(`DB connection error:`, error);
    process.exit(1);
  }
};

const startServer = async (port, server) => {
  await initDBConnection();
  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

module.exports = startServer;
