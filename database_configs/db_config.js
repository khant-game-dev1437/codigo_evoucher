function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true,
  });
}

define("DEBUG", true);

define("DB_COURSES_DATABASE", "evoucher_codigo");

if (this.DEBUG) {
  // 	Development
  define("DB_HOST", "192.168.99.50");
  define("DB_PORT", "3306");
  define("DB_USER", "root");
  define("DB_PASSWORD", "Futurehub1@"); //DB Password
} else {
  // Live
}
