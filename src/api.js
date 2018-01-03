import axios from 'axios';

export const Api = {
  getUsers() {
    const URL = 'http://sanadtech-lab.appspot.com/';
    return new Promise((resolve, reject) => {
      axios
        .get(URL)
        .then(userData => {
          resolve(userData.data);
        }).catch(err => {
          reject();
        });
    });
  }
};