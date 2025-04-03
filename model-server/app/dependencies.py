from fastapi import WebSocket, WebSocketDisconnect, status
from typing import Optional

async def get_current_user(websocket: WebSocket):
    try:
        # Here you would validate the JWT token or session
        # For now, we'll just accept the user_id from path
        return websocket.path_params.get("user_id")
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        raise WebSocketDisconnect()