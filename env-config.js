const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BASE_URL": prod
    ? "https://salihsert.herokuapp.com"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "https://salihsert.herokuapp.com",
  "process.env.CLIENT_ID": "XWudUslNATT3Zds70v3yvTA04M7ffdSO",
};
