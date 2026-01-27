<?php
/**
 * WordPress Configuration for cPanel Production
 * Upload this as wp-config.php to public_html/wordpress/
 */

/* Force HTTPS */
$_SERVER['HTTPS'] = 'on';

/* Site URLs */
define('WP_HOME', 'https://chillocreative.com/wordpress');
define('WP_SITEURL', 'https://chillocreative.com/wordpress');

// ** Database settings ** //
define('DB_NAME', 'chilloc1_chillo');
define('DB_USER', 'chilloc1_chillo');
define('DB_PASSWORD', '2J,V]IOXu@IFuUT-');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

/* Authentication Keys and Salts */
define('AUTH_KEY',         'xK9!mP2@nQ5#oR8$pS1^qT4&rU7*sV0(tW3)uX6+vY9-wZ2');
define('SECURE_AUTH_KEY',  'aB3#cD6!dE9@eF2$fG5^gH8&hI1*iJ4(jK7)kL0+lM3-nN6');
define('LOGGED_IN_KEY',    'oO9$pP2!qQ5@rR8#sS1^tT4&uU7*vV0(wW3)xX6+yY9-zZ2');
define('NONCE_KEY',        'aA5^bB8!cC1@dD4#eE7$fF0&gG3*hH6(iI9)jJ2+kK5-lL8');
define('AUTH_SALT',        'mM1&nN4!oO7@pP0#qQ3$rR6^sS9*tT2(uU5)vV8+wW1-xX4');
define('SECURE_AUTH_SALT', 'yY7*zZ0!aA3@bB6#cC9$dD2^eE5&fF8(gG1)hH4+iI7-jJ0');
define('LOGGED_IN_SALT',   'kK3(lL6!mM9@nN2#oO5$pP8^qQ1&rR4*sS7)tT0+uU3-vV6');
define('NONCE_SALT',       'wW9)xX2!yY5@zZ8#aA1$bB4^cC7&dD0*eE3(fF6+gG9-hH2');

/* Database table prefix */
$table_prefix = 'wp_';

/* Debugging - disabled for production */
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

/* Absolute path to the WordPress directory */
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

/* Sets up WordPress vars and included files */
require_once ABSPATH . 'wp-settings.php';
