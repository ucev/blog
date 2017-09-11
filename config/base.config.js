const mysql_database_config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog_node",
  charset: 'utf8mb4'
};
const session = {
  key: 'fzkldfajeiofajdkjakfkja;jeiofa',
  maxAge: 24 * 60 * 60 * 1000
};
const website_info = {
  title: "张帅的个人博客",
  url: "http://localhost:3000",
  default_front_pic: '/images/default_front_pic.jpg',
  host: 'localhost',
  port: 3000,
  debug: true,
  debug_session: 1
};

const label_hotmark_rule = {
  add: 5,
  view: 3,
  query: 2
};

const query_config = {
  step: 10
};

const qqlogin = {
  appid: '101383430',
  secret: 'f61e6b31931254e8015bb65a4dde3cae',
  redirect_url: website_info.default_front_pic + '/admin/login/redirect',
  state: 1,
  allowed_openid: 'FBBAE32566216A769134BD6F12E4B268'
};

const mail_config = {
  connect: {
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
      user: '3120921953@qq.com',
      pass: 'vlpcfxhprwcvdhej'
    }
  },
  admin: '3120921953@qq.com'
};

exports.database_config = mysql_database_config;
exports.website_info = website_info;
exports.label_hotmark_rule = label_hotmark_rule;
exports.query_config = query_config;
exports.qqlogin = qqlogin;
exports.session = session;
exports.mail_config = mail_config;