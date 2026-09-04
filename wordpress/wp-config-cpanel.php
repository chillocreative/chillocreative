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
define('DB_NAME', 'YOUR_CPANEL_DB_NAME');
define('DB_USER', 'YOUR_CPANEL_DB_USER');
define('DB_PASSWORD', 'YOUR_DB_PASSWORD');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

/* Authentication Keys and Salts */
/* IMPORTANT: Generate your own unique values at https://api.wordpress.org/secret-key/1.1/salt/ */
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

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
