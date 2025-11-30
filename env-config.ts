
const IS_DEVELOPMENT = process.env.APP_ENV === 'development';
const IS_RENDER = process.env.IS_RENDER === 'True';

let BACKEND_URL = process.env.GCLOUD_BACKEND_URL;

if (IS_RENDER) { 
  BACKEND_URL = process.env.RENDER_BACKEND_URL;
}

if (IS_DEVELOPMENT) {
  BACKEND_URL = process.env.LOCAL_BACKEND_URL || "http://127.0.0.1:8000/api/py/";
}

export { BACKEND_URL };