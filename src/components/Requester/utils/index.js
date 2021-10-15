
import ZSchema from 'z-schema';

const _sliceParams = (params) => {
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    queryParams.set(key, value);
  }
  return `?${queryParams.toString()}`;
};

const parseParams = (params) => {
  return params ?
    _sliceParams(params) :
    '';
};

const jsonValidator = new ZSchema();

export {
  parseParams,
  jsonValidator,
};
