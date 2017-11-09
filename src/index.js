import mongoose from 'mongoose';

export default class MongooseAnalytics {

  getBasicStats = () => {

    return new Promise((resolve, reject) => {

      let promises = [];
      let data = {

      }

      Object.keys(mongoose.models).map(key => {

      const model = mongoose.models[key];

        promises.push(mongoose.model(model.modelName).count()
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
    return mongoose.model(modelName).find(options);
  }

  count = (modelName, options) => {
    return mongoose.model(modelName).count(options);
  }

}
