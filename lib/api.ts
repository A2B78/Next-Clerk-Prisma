// lib/api.ts
export async function getAllUsersInfo() {
    console.log("getAllUsersInfo called"); // Debugging
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log("API response:", response); // Debugging
    if (!response.ok) {
        throw new Error('Failed to fetch users info');
    }
    const data = await response.json();
    console.log("API data:", data); // Debugging
    return data.users;
}