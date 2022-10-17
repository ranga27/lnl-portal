### Run stripe-webhook on local

#### Development mode

1. Make sure you have installed stripe CLI on your machine
2. `stripe login`
3. Run for development mode
   `stripe listen --forward-to localhost:3000/api/webhook`
   Basically this is our api endpoint
4. This will give webhook signing secret. Copy that to .env.development/STRIPE_WEBHOOK_SIGNING_SECRET

#### Production mode

Put production endpoint url to stripe-webhook endpoint in Developers > Webhooks section of stripe dashboard, get signing secret & put that to .env.production/STRIPE_WEBHOOK_SIGNING_SECRET
