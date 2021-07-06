## Custom Authentication

Once you share the link to a plio, your viewers can watch your plio using that link. However, if someone is not already logged in to Plio, they will have to authenticate themselves first. Sometimes, this is not desirable as that can cause additional friction for youe viewer and you might want them to directly watch the plio without having to log in.

Plio now provides you a way to do precisely that. You can do this using the API Key which is assigned to every organization. You will be provided your API Key when your organizational workspace is created. It is your responsibility to ensure that you don't share this API key with anyone or include it in any document that is publicly accessible.

### Bypass Plio's authentication

This is how a typical plio link looks like: 

```:no-line-numbers
https://app.plio.in/#/play/r7R7ErAy2a
```

To bypass plio's authentication, you need to add 2 parameters to the query:
- `unique_id`: this should be the unique identifier for your viewer. There are two ways to use this: if you already have a platform where your viewer has to authenticate before watching a plio, you can simply pass in the unique ID for that viewer in your system. If you don't have your own user management system and simply want any viewer to bypass Plio's authentication, you can use any random value for this but then, you won't be able to identify the users during analysis. 
- `api_key`: this should be the API key that was shared with you as mentioned above

The modified link should look like:

```:no-line-numbers
https://app.plio.in/#/play/r7R7ErAy2a?unique_id=UNIQUE_ID&api_key=YOUR_API_KEY
```

You need to share this link with your viewers instead of the usual plio link.