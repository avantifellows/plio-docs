## Custom Authentication

Your viewers can watch your plio using the link that you share with them. However, if someone is not already logged in to Plio, they will have to authenticate themselves first. Sometimes, this is not desirable as it can cause additional friction for your viewer and you might want them to directly watch the plio without having to log in.

Plio provides you with a way to do precisely that. You can do this using a unique **API Key** which is assigned to every organization. You will be provided with your API Key when your organizational workspace is created. 

::: danger

It is your responsibility to ensure that you don't share this API key with anyone or include it in any document that is publicly accessible.

:::

### Use your own authentication system with Plio

This is how a typical plio link looks like: 

```:no-line-numbers
https://app.plio.in/#/play/r7R7ErAy2a
```

To bypass plio's authentication, you need to add 2 parameters to the query:
- `unique_id`: this should be the unique identifier for your viewer
- `api_key`: this should be the API key that was shared with you as mentioned above

The modified link should look like:

```:no-line-numbers
https://app.plio.in/#/play/r7R7ErAy2a?unique_id=UNIQUE_ID&api_key=YOUR_API_KEY
```

You need to share this link with your viewers instead of the usual plio link and your viewers will be able to access the plio without having to authenticate.

There are two ways to use this feature:
- If you already have a user management system, you can simply pass in the unique ID for a viewer in your system as the `unique_id` parameter mentioned above.
- If you don't and simply want any viewer to bypass Plio's authentication, you can use any random value for `unique_id`. However, in this case, you won't be able to identify the users during analysis. 