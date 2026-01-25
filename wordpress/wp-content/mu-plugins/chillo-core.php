<?php
/**
 * Plugin Name: Chillo Creative Core Registration
 * Description: Registers Portfolio and Services Custom Post Types for Headless use.
 */

add_action('init', function() {
    // Register Portfolio CPT
    register_post_type('portfolio', [
        'labels' => [
            'name' => 'Portfolio',
            'singular_name' => 'Project',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true, // CRITICAL: Makes it visible to Next.js
        'graphql_single_name' => 'project',
        'graphql_plural_name' => 'projects',
        'menu_icon' => 'dashicons-art',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    ]);

    // Register Services CPT
    register_post_type('service', [
        'labels' => [
            'name' => 'Services',
            'singular_name' => 'Service',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true, // CRITICAL: Makes it visible to Next.js
        'graphql_single_name' => 'service',
        'graphql_plural_name' => 'services',
        'menu_icon' => 'dashicons-hammer',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    ]);
});
