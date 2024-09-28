export const getFormFields = form => {
  const keys = Object.keys(form);
  return keys.reduce((result, key) => {
    result[key] = form[key].value;
    return result;
  }, {});
};

export const createForm = data => {
  const keys = Object.keys(data);
  return keys.reduce((result, key) => {
    result[key] = {value: data[key]};
    return result;
  }, {});
};

export const validateForm = form => {
  const keys = Object.keys(form);
  return keys.reduce((result, key) => {
    result[key] = form[key];
    if (form[key].value) {
      result[key].error = '';
    } else {
      result[key].error = 'Please enter a value.';
    }
    return result;
  }, {});
};

export const isFormValid = form => {
  const keys = Object.keys(form);
  return !keys.some(key => {
    if (form[key].error) {
      return true;
    }
    return false;
  });
};
