<?php
/**
 * Front to the WordPress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells WordPress to load the theme.
 *
 * @package WordPress
 */

/**
 * Tells WordPress to load the WordPress theme and output it.
 *
 * @var bool
 */
define('WP_USE_THEMES', true);

/** Loads the WordPress Environment and Template */
<<<<<<< HEAD
require( dirname( __FILE__ ) . '/wp-blog-header.php' );
=======
require( dirname( __FILE__ ) . '/wordpress/wp-blog-header.php' );
>>>>>>> a846214aae567d7dae5e1824a1a64b1d23ddbf18
