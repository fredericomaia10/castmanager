import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Thumbnail, Button, Row, Col } from 'react-bootstrap';
import { deleteFile } from '../../api/files/methods';

const deleteImage = (e, url) => {
  e.preventDefault();
  if (confirm('Tem certeza?')) {
    deleteFile.call({ url }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Arquivo removido!', 'success');
      }
    });
  }
};

const LogoImage = ({ url }) => (
  url ?
  <Row>
    <Col xs={6} md={4} mdOffset={4} xsOffset={3}>
      <Thumbnail className="LogoImage" href={ url } alt={ url } src={ url }>
        <p className="text-center">
          <Button bsStyle="default" bsSize="xsmall"
            onClick={ e => deleteImage(e, url) }>
            <i className="fa fa-remove" /> Remover
          </Button>
        </p>
      </Thumbnail>
    </Col>
  </Row> : <Row />
);

LogoImage.propTypes = {
  url: React.PropTypes.string,
};

export default LogoImage;
