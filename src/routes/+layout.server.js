export async function load() {
    return {
        session: {
            authenticated: true,
            settings: {
                blocks: '2.0',
                theme: 'light',
                showSignatures: false
            },
            user: {
                username: 'Jeffalo',
            }
        }
    };
}