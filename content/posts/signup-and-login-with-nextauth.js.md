---
date: 2022-04-14
tags:
  - nextjs
  - next-auth
  - authentication
title: Authenticating with your backend using NextAuth.js
summary: This article describes how to set up NextAuth.js and authenticate against
  your own backend.
published: true
updatedAt:
---

You may be in a situation where you need to authenticate against your custom backend solution. That is, you have a backend with endpoints for authentication, and you want to use NextAuth.js to handle authentication on your Next.js frontend. In this case, the official documentation is not clear on what you need to do. This article will guide you on how to authenticate against your backend with NextAuth.js.

> Check out the source code to the [repo](https://github.com/ekrresa/next-auth-credentials-demo) used to demonstrate the solution.

## How NextAuth.js works

In NextAuth.js, the data that describes the current logged in user is stored in sessions that you can access on the frontend. You can modify the data contained in the session. More on that soon.

The NextAuth.js configuration is done by creating a file called `[...nextauth].js` in the `pages/api/auth` directory. This file is a route handler for all requests to NextAuth.js. You can make requests to NextAuth.js with the [Client API](https://next-auth.js.org/getting-started/client) or [REST API](https://next-auth.js.org/getting-started/rest-api). We are only going to make use of the Client API in this article.

Below is an example of a sample NextAuth.js configuration.

    import NextAuth from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";

    export default NextAuth({
      providers: [
        CredentialsProvider({
          id: "login",
          async authorize(credentials) {
    		  //...
    		},
        }),
      ],
      callbacks: {
        async signIn({ user }) {
          //...
        },
        async session({ session, token }) {
    	    //...
    	  },
        async jwt({ token, user }) {
    		//...
    	  },
      },
      // use env variable in production
      secret: "looselipssinkships",
    });

In a minute I’m going to explain the purpose of each option in the configuration object. While the configuration object can take in more options, we will only be looking at the options that are relevant to the goals of this article.

### Providers

In the `providers` array, you specify what authentication medium to use for NextAuth.js. NextAuth.js has support for authentication using OAuth providers like Google, Facebook, and Github, and also signing in by email. You can define multiple providers in your configuration. In this article, we will use the Credentials provider.

### Callbacks

Callbacks are asynchronous functions useful for hooking into specific parts of the authentication flow. We will focus on three of them in this article; `signIn`, `session` and `jwt`.

- **SignIn callback**: In this callback, you can control if a user is allowed to sign in. For example, you can check the role of the user and make the appropriate response.
- **JWT callback**: In the sign-in process, the JWT callback is invoked after the signIn callback. Here a JSON Web Token is created. You can persist more data on the token.
- **Session callback**: In this callback, you can modify the data you want to make available to the client. During sign-in, the JWT callback is invoked before the session callback, so any information added to the token is immediately available in the session callback via the `token` parameter.

![](https://res.cloudinary.com/chuck-huey/image/upload/c_scale,dpr_auto,w_auto,q_auto,f_auto/v1649856272/personal/blog/images/callback-flow_vruf02.png)The picture above describes the flow of how the callbacks are invoked during the sign-in process.

### Secret

This is a random string used to hash tokens, sign/encrypt cookies and generate cryptographic keys. It is required in production.

## Signup and Login Implementation

I will not go into the details of my login and signup form because everyone has their unique setup. What we would discuss is:

1. NextAuth.js setup.
2. Configuration.
3. Authentication.

### NextAuth.js Setup

Here’s how you get up and running with NextAuth.js:

1. Install NextAuth.js, `npm install next-auth` or `yarn add next-auth`
2. Add a `NEXTAUTH_URL` environment variable. Set it to the canonical url of your project. For example:

```js
   NEXTAUTH_URL=http://localhost:3000
```

3. Create a `[…nextauth].js` file in the `pages/api/auth` folder. This is where you configure NextAuth.js.
4. In your `_app.js` file, wrap your app with the SessionProvider.

```js
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

### Configuration

Below is the configuration used for this article.

    import NextAuth from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";
    import * as Auth from "../../../lib/auth";

    export default NextAuth({
      providers: [
        CredentialsProvider({
          id: "login",
          async authorize(credentials) {
            try {
              return await Auth.login(credentials);
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }),
        CredentialsProvider({
          id: "signup",
          async authorize(credentials) {
            try {
              return await Auth.signup(credentials);
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }),
      ],
      callbacks: {
        async signIn({ user }) {
          if (user) return true;

          return false;
        },
        async session({ session }) {
          session.user.isLoggedIn = true;
          return session;
        },
        async jwt({ token, user }) {
          return token;
        },
      },
      // use env variable in production
      secret: "looselipssinkships",
    });

There are two providers defined using `CredentialsProvider` from NextAuth.js. One for login, and one for signup. The Credentials provider is what you need when you want to authenticate against your backend. Each of the providers has an `id` field. The id field is an identifier for each provider definition.

The `authorize` function in the provider definition contains the logic for authentication. As you can see, the function has a parameter called credentials. When you make an authentication request to NextAuth.js, this parameter represents the authentication credentials. After that, you send the credentials to your backend for authentication. The function should return an object on success or null on error. You could also throw an error.

The result of the `authorize` function can be accessed in the `signIn` callback via the `user` parameter. The callback returns true if the object is defined. Otherwise, it returns false.

Take note of the session callback. The session object can be modified here in order to add data that can be used in the frontend. In the configuration above, we added an `isLoggedIn` property to the `user` property of the `session` object.

Finally, don't forget to set the `secret` option value in production. If you don't, your app will throw an error. You can set an environment variable, `NEXTAUTH_SECRET`, in place of the secret option.

### Authentication

For signup and login, the process is essentially the same. In your signup/login form, import the `signIn` function from `next-auth/react` module. Invoke the function in your form submit handler passing in the provider id and authentication credentials.

> The **signIn callback** is a function in the NextAuth.js configuration where you handle the result of the authorize function, while the **signIn function** is a function you invoke to make an authentication request to the NextAuth.js handler.

The example below showcases making a request to NextAuth.js with the `signIn` function.

     import { signIn } from "next-auth/react";

     const response = await signIn("login", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

The first argument, `login`, specifies that the provider definition with id login should handle the request.

Setting the `redirect` option to false prevents a page reload so you can handle the sign-in response in your form submit handler. It is optional.

The `signIn` function returns a promise which resolves to this object:

    {
      error: string | undefined;
      status: number;
      ok: boolean;
      url: string | null;
    }

With this object, you can make a decision on whether the user’s authentication was successful or not.

---

So this is everything about authenticating with your backend using NextAuth.js. I hope this article would prove useful to you. Enjoy!
