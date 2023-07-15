const jsonToFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      for (const item of obj[key]) {
        formData.append(key, item);
      }
    } else {
      formData.append(key, obj[key]);
    }
  }
  return formData;
};

export const uploadRequest = (_api, config) => {
  if (config.formData === true) {
    config.headers['Content-Type'] = 'multipart/form-data';
    config.data = jsonToFormData(config.data);
  }
  return config;
};
