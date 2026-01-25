export async function fetchGraphQL(query: string, variables = {}) {
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

    const json = await json_to_string(res.json());

    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }

    return json.data;
}

function json_to_string(jsonPromise: Promise<any>) {
    return jsonPromise.then(data => data);
}
