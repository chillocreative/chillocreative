<?php
/**
 * WordPress Production Configuration
 *
 * @package WordPress
 */

// ** Database settings for Production ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'YOUR_CPANEL_DB_NAME' ); // e.g., 'chillo_wordpress'

/** Database username */
define( 'DB_USER', 'YOUR_CPANEL_DB_USER' ); // e.g., 'chillo_admin'

/** Database password */
define( 'DB_PASSWORD', 'YOUR_DB_PASSWORD' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication unique keys and salts.
 */
define( 'AUTH_KEY',         'DOg=?-ZF T[;!ve0dsHu%L0r^NOrZ H4PYLy.I)_svhuo)~ BTYe6be4z#RaifKt' );
define( 'SECURE_AUTH_KEY',  '0Z!Bu0(>/50-%x~!|kmTVjq}<e>OkL_?p4%j{nKQQ$PhOoF?mJ|6#9L`WGXQMC9*' );
define( 'LOGGED_IN_KEY',    '5.9!NVh,Ro{1(-~`TO_H0B8o{P^V_)[$+W#dGa&DOow;{pN|tM>Dml[fN,CqM@yi' );
define( 'NONCE_KEY',        ',C/zJ2OYMqH c[}.+BJZX,{:~?b>Q|:$!([bwacM8pHJ&Qyd+Syd5o!dgne%{xT.' );
define( 'AUTH_SALT',        '6Eri}{aA^wDT%;teBvow0@DNNa:%M#a83Q0/fnb{KBo0@JJ8&C#B:wwepXV9h1%%' );
define( 'SECURE_AUTH_SALT', ',|H~<rBZCX1(4lhKKJ^VhQ|$qg,]ZcUh75WC5<T%DI_^0[HkqkC;I<&?u]_N)`+t' );
define( 'LOGGED_IN_SALT',   'TB&I8Ph*S<,9824-QtG^kt(qDwP#;E4alna6m?wJF<4hRTwNN/E8rM[wHAa,fM^R' );
define( 'NONCE_SALT',       '(v _y+-iw6ra]g)[CsqpfqP=_$2fF-hrEo6>Lq jH2BmEfU$Y_|Z&&E#_a0[R0=:' );

/**
 * WordPress database table prefix.
 */
$table_prefix = 'wp_';

/**
 * WordPress debugging mode - disabled for production
 */
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISPLAY', false );

/**
 * WordPress Site URL - Update these for production
 */
define( 'WP_HOME', 'https://chillocreative.com/wordpress' );
define( 'WP_SITEURL', 'https://chillocreative.com/wordpress' );

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
