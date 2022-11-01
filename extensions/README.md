### Install extension

- Install stripe extension in console -> https://firebase.google.com/products/extensions/stripe-firestore-stripe-payments

### Prerequsites

1. Stripe API key with restricted access

   - In stripe's Developers section go to API keys & click on Create restricted key with below permissions
     - product.created
     - product.updated
     - product.deleted
     - price.created
     - price.updated
     - price.deleted
     - checkout.session.completed
     - customer.subscription.created
     - customer.subscription.updated
     - customer.subscription.deleted
     - tax_rate.created (optional)
     - tax_rate.updated (optional)
     - invoice.paid
     - invoice.payment_succeeded
     - invoice.payment_failed
     - invoice.upcoming
     - invoice.marked_uncollectible
     - invoice.payment_action_required

2. Stripe webhook secret
   - In stripe's Developers section go to Webhooks & click on Add endpoint. Put endpoint URL which can be get from extenstion's "How this extension works" section. And finally save this endpoint.
   - Click on this newely created webhook url and copy siging secret.

### Configure extension

    - Location: Functions deployment location
    - Products & pricing plans collection: i.e. products
    - Customer details & subscriptions collection: Collection to store purchased subscriptions. i.e. Choose a collection where the users are stored. In our project it is companyUsers
    - Sync users: Sync
    - Automatically delete: Auto delete
    - Stripe API key: restricted stripe api key
    - Stripe webhook secret:
    - Minimum instances: 0
