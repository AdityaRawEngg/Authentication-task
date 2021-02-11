export const getCookie = (name) => {
  if (document.cookie.split(";").find((cookie) => cookie.startsWith(name))) {
    return document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(name))
      .split("=")[1];
  }
  return false;
};

export const setCookie = (name, value, options = {}) => {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let cookieOptions = "";
  Object.keys(options).forEach((option) => {
    cookieOptions += `${option}=${options[option]};`;
  });
  document.cookie = `${name}=${value};${cookieOptions}`;
  return true;
};

export const removeCookie = (name) => {
  document.cookie = `${name}=;path=/;max-age=-1`;
  return true;
};
