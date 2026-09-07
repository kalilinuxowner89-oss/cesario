# Cesario - WhatsApp Bot Public
## Deployment Guide

### Deploy on Render

1. **Connect GitHub Repository**
   - Go to https://render.com
   - Click "New +" and select "Web Service"
   - Connect your GitHub account
   - Select the `cesario` repository

2. **Configure Web Service**
   - Name: `cesario`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free` or `Starter`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   WHATSAPP_API_KEY=your_whatsapp_api_key
   WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_VERIFY_TOKEN=your_verify_token
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_admin_password
   ADMIN_PHONE=your_phone_number
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your bot will be available at: `https://cesario-xxxx.onrender.com`

### Deploy with Docker

```bash
# Build image
docker build -t cesario:latest ./deploy

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=your_mongodb_uri \
  -e WHATSAPP_API_KEY=your_api_key \
  --name cesario-bot \
  cesario:latest
```

### Deploy on Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create cesario-bot

# Set environment variables
heroku config:set NODE_ENV=production -a cesario-bot
heroku config:set MONGODB_URI=your_mongodb_uri -a cesario-bot
heroku config:set WHATSAPP_API_KEY=your_api_key -a cesario-bot

# Deploy
git push heroku main
```

### Configure WhatsApp Webhook

After deployment, configure your WhatsApp Business webhook:

1. Go to WhatsApp Business API Console
2. Set Webhook URL: `https://your-deployed-url.com/webhook/whatsapp`
3. Set Verify Token: `your_verify_token` (from .env)
4. Subscribe to webhook events:
   - messages
   - message_template_status_update

### Monitoring

- Check logs: `https://your-app-url.com/health`
- Dashboard: `https://your-app-url.com/dashboard`
- API Status: `https://your-app-url.com/api/status`

### Troubleshooting

**Bot not receiving messages:**
- Verify webhook is configured correctly
- Check verify token matches
- Ensure app is running (check logs)

**Database connection failed:**
- Verify MONGODB_URI in environment variables
- Check MongoDB instance is running
- Verify network access is allowed

**Ban system not working:**
- Ensure ADMIN_PHONE environment variable is set
- Check database connection
- Verify user has admin permissions