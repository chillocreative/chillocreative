<?php
/**
 * Plugin Name: CORS Headers for GraphQL
 * Description: Adds CORS headers for WPGraphQL to work with headless frontend
 */

// Add CORS headers
add_action('init', function() {
    // Allow requests from your frontend domain
    $allowed_origins = [
        'https://chillocreative.com',
        'http://chillocreative.com',
        'https://www.chillocreative.com',
        'http://www.chillocreative.com',
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins) || strpos($origin, 'chillocreative.com') !== false) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
        header("Access-Control-Allow-Credentials: true");
    }

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Max-Age: 86400");
        exit(0);
    }
});

// Also add headers specifically for GraphQL
add_action('graphql_response_headers_to_send', function($headers) {
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (strpos($origin, 'chillocreative.com') !== false || empty($origin)) {
        $headers['Access-Control-Allow-Origin'] = $origin ?: '*';
        $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    }
    
    return $headers;
});
