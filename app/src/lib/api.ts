export async function getUserChats(userId: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/chats/user/${userId}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch {
    throw new Error('Failed to fetch user chats');
  }
}

export async function deleteChat(chatId: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/chats/${encodeURIComponent(chatId)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to delete chat');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw error;
  }
}

export async function getChat(chatId: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/chats/session/${chatId}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch {
    throw new Error('Failed to fetch chat');
  }
} 