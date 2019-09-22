# secure-actions-webhook

Securely call CD servers / notification services after your Action finishes

## Usage

Sending a string:

```yaml
- name: Webhook
  uses: ybrin/secure-actions-webhook@0.1.1
  env:
    REQUEST_URI: ${{ secrets.REQUEST_URI }}
    REQUEST_DATA: "something_interesting"
    HMAC_SECRET: ${{ secrets.HMAC_SECRET }}
```

Sending a json string:

```yaml
- name: Webhook
  uses: ybrin/secure-actions-webhook@0.1.1
  env:
    REQUEST_URI: ${{ secrets.REQUEST_URI }}
    REQUEST_DATA: '{ "something": "interesting" }'
    HMAC_SECRET: "secret_used_to_generate_signature"
```

The request will include the header `X-Hub-Signature`, which is the hmac signature of the raw body just like in Github webhooks
(sha1=<hmac_signature>).    
Verify it on your endpoint for integrity.
