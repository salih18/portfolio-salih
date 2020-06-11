// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:"mongodb+srv://test:test12345@portfolio-rzqwq.mongodb.net/test?retryWrites=true&w=majority",
    //MONGO_SRV:"mongodb+srv://production:production12345@cluster0-tgvdm.mongodb.net/test?retryWrites=true&w=majority",
  },
};
