import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseParams, jsonValidator } from '../utils';

const useRequester = ({ method = 'get', url = '', _schema = {} }) => {

  const [_params, setParams] = useState(null);
  const [_data, setData] = useState(null);
  const [response, setResponse] = useState(null);

  const _getTv4Errors = (tv4Errors) => {
    const { code, message, schemaId, params } = tv4Errors;
    const detail = { 'error-code': code, 'http-status': 'tv4', message, schemaId, params };
    return { detail };
  };

  const _validateSchema = (data, schema) => {
    return new Promise((resolve, reject) => {
      return jsonValidator.validate(data, schema) ?
        resolve(data) :
        reject(_getTv4Errors(jsonValidator.getLastErrors()[0]));
    });
  };

  const _setStructure = (data) => {
    return data;
  };
  const _handleSuccess = (data) => {
    console.log(data);
  };
  const _requestError = (err) => {
    console.log(err);
  };
  const executeRequest = () => {
    axios({
      method,
      url: url + _params,
      data: _data,
    }).then(({ data }) => _validateSchema(data, _schema.responseScheme))
      .then((data) => _validateSchema(_setStructure(data), _schema.mappingScheme))
      .then(_handleSuccess)
      .catch(_requestError);
  };
  const generateRequest = ({ data = undefined, params = {} }) => {
    setParams(parseParams(params));
    setData(data);
  };

  useEffect(() => {
    if (_data && _params) {
      executeRequest();
    }
  }, [_data, _params]);

  return {
    generateRequest,
    response,
  };
};

export default useRequester;
