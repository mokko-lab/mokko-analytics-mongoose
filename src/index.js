
export default class MongooseAnalytics {

  constructor(mongooseInstance) {
    this.mongoose = mongooseInstance;
  }

  getBasicStats = () => {

    return new Promise((resolve, reject) => {

      let promises = [];
      let data = {

      }

      Object.keys(this.mongoose.models).map(key => {

      const model = this.mongoose.models[key];

        promises.push(this.mongoose.model(model.modelName).count()
        .then(res => {
          data[model.modelName] = {
            count: res
          }
        }));
      });

      Promise.all(promises)
      .then(res => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      })

    })

  }


  query = (modelName, options) => {
    return this.mongoose.model(modelName).find(options);
  }

  count = (modelName, options) => {
    return this.mongoose.model(modelName).count(options);
  }

}
