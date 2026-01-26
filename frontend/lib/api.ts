export async function fetchGraphQL(query: string, variables = {}) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            cache: 'no-store', // Force fresh data on every request
        });

        const json = await res.json();

        if (json.errors) {
            console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
            throw new Error('Failed to fetch API: ' + json.errors[0].message);
        }

        return json.data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}

