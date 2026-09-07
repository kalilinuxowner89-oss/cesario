# Cesario API Documentation

## Base URL
```
http://localhost:3000
or
https://your-deployed-url.com
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Verify Token
```
GET /api/auth/verify
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "username": "admin"
  }
}
```

### Banning System

#### Ban a Number
```
POST /api/bans/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "number": "+33612345678",
  "reason": "Spam messages"
}

Response:
{
  "success": true,
  "ban": {
    "_id": "...",
    "number": "+33612345678",
    "reason": "Spam messages",
    "bannedAt": "2024-01-15T10:30:00Z",
    "permanent": true
  }
}
```

#### Unban a Number
```
POST /api/bans/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "number": "+33612345678"
}

Response:
{
  "success": true,
  "result": { ... }
}
```

#### Get All Bans
```
GET /api/bans
Authorization: Bearer <token>

Response:
{
  "success": true,
  "bans": [
    {
      "_id": "...",
      "number": "+33612345678",
      "reason": "Spam",
      "bannedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Ban Count
```
GET /api/bans/count
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 5
}
```

#### Check if Number is Banned
```
GET /api/bans/check/:number
Authorization: Bearer <token>

Response:
{
  "success": true,
  "number": "+33612345678",
  "isBanned": true
}
```

### Bot Management

#### List All Bots
```
GET /api/bots

Response:
{
  "success": true,
  "bots": [
    {
      "id": "1234567890",
      "name": "Bot Cesario",
      "description": "Main bot",
      "active": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### Create Bot
```
POST /api/bots
Content-Type: application/json

{
  "name": "My Bot",
  "description": "Bot description",
  "active": true
}

Response:
{
  "success": true,
  "bot": { ... }
}
```

#### Get Bot by ID
```
GET /api/bots/:id

Response:
{
  "success": true,
  "bot": { ... }
}
```

#### Update Bot
```
PUT /api/bots/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "active": false
}

Response:
{
  "success": true,
  "bot": { ... }
}
```

#### Delete Bot
```
DELETE /api/bots/:id

Response:
{
  "success": true,
  "message": "Bot deleted"
}
```

### WhatsApp Webhook

#### Webhook Verification
```
GET /webhook/whatsapp?hub.mode=subscribe&hub.verify_token=TOKEN&hub.challenge=CHALLENGE

Response: CHALLENGE (plain text)
```

#### Receive Messages
```
POST /webhook/whatsapp
Content-Type: application/json

{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "...",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "messages": [
              {
                "from": "+33612345678",
                "id": "wamid.xxx",
                "timestamp": "1234567890",
                "text": { "body": "Hello bot" }
              }
            ]
          }
        }
      ]
    }
  ]
}

Response:
{
  "status": "received"
}
```

### Health Check

```
GET /health

Response:
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Required field missing"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or missing token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Detailed error message (only in development)"
}
```

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding:
- 100 requests per minute per IP
- 1000 requests per hour per user

## Best Practices

1. **Always use HTTPS** in production
2. **Validate input** on both client and server
3. **Use strong passwords** for admin accounts
4. **Keep API keys secure** - never commit them
5. **Monitor logs** for errors and suspicious activity
6. **Backup database** regularly
7. **Use environment variables** for sensitive data

## Examples

### JavaScript/Fetch
```javascript
// Ban a number
const response = await fetch('https://your-api.com/api/bans/add', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    number: '+33612345678',
    reason: 'Spam'
  })
});

const data = await response.json();
console.log(data);
```

### Python/Requests
```python
import requests

headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}

data = {
    'number': '+33612345678',
    'reason': 'Spam'
}

response = requests.post('https://your-api.com/api/bans/add', headers=headers, json=data)
print(response.json())
```

### cURL
```bash
curl -X POST https://your-api.com/api/bans/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"number": "+33612345678", "reason": "Spam"}'
```