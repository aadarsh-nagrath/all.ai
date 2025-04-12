export async function getUserChats(userId: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/chats/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to fetch chats');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error; // Re-throw the error to handle it in the component
  }
} 