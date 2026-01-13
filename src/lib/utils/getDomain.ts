const getDomain = () => {
  const IS_DEVELOPMENT = process.env.APP_ENV === "development";
  

  let domain = process.env.NEXT_PUBLIC_DOMAIN;
  let http = "http";


  if (IS_DEVELOPMENT) {
    domain = process.env.NEXT_PUBLIC_LOCAL_DOMAIN;
  } else {
    http += "s";
  }

  console.log(process.env.APP_ENV, domain, IS_DEVELOPMENT);

  return { http, domain };
};

export default getDomain;
