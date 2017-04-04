// configs for connecting to a database
const mysql_database_config = {
  host: "",
  user: "",
  password: "",
  database: "",
  charset: 'utf8mb4'
};

// configs for config 'cookie-session'
const session = {
  name: '',
  keys: [],
  
  maxAge: 24 * 60 * 60 * 1000
};
// base info of the website
const website_info = {
  // website's name
  title: "",
  // website's main url
  url: "",
  // website front page's default background picture
  default_front_pic: '',
  // hostname of the website
  host: '',
  // port used by the website
  port: 3000,
  // if the website is in debug mode, for login or other function
  debug: true,
  // session used when in debug mode
  debug_session: 1
}

// config regulation for label's hotmark
const label_hotmark_rule = {
  add: 5,
  view: 3,
  query: 2
}

const query_config = {
  // items to get when query a database
  step: 10
};

// config info for qq login
const qqlogin = {
  appid: '',
  secret: '',
  redirect_url: website_info.default_front_pic + '',
  state: 1,
  allowed_openid: ''
};

const mail_config = {
  connect: {
    // see nodemailer
    // https://nodemailer.com/about/
  },
  admin: ""
};

exports.database_config = mysql_database_config;
exports.website_info = website_info;
exports.label_hotmark_rule = label_hotmark_rule;
exports.query_config = query_config;
exports.qqlogin = qqlogin;
exports.session = session;
exports.mail_config = mail_config;