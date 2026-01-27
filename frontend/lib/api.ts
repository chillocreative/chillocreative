export async function fetchGraphQL(query: string, variables = {}) {
    try {
        // Use the environment variable, but fallback to a relative URL for production robustness
        const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '/wordpress/graphql';

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            cache: 'no-store',
        });

        if (!res.ok) {
            const text = await res.text().catch(() => 'No response body');
            throw new Error(`HTTP Error ${res.status}: ${text}`);
        }

        const json = await res.json();

        if (json.errors) {
            console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
            throw new Error('Failed to fetch API: ' + json.errors[0].message);
        }

        return json.data || {};
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}

