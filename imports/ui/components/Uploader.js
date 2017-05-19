import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { storeUrlInDatabase } from '../../api/files/methods';

const addUrlToDatabase = (url) => {
  storeUrlInDatabase.call({ url }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Upload realizado com sucesso.', 'success');
    }
  });
};

const upload = (event) => {
  const file = event.target.files[0];
  const uploader = new Slingshot.Upload('uploadToAmazonS3');

  uploader.send(file, (error, url) => {
    if (error) {
      Bert.alert(error.message, 'warning');
    } else {
      addUrlToDatabase(url);
    }
  });
};

const Uploader = () => (
  <div className="Uploader">
    <p className="alert alert-success text-center">
      <span>Clique ou arraste um arquivo aqui para realizar upload</span>
      <input type="file" onChange={ upload } />
    </p>
  </div>
);

export default Uploader;
