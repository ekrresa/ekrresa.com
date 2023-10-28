---
date: 2023-10-23
updatedAt:
tags:
  - localstorage
  - custom hook
  - react
  - typescript
  - server-side rendering
title: Mastering LocalStorage Management with React Hooks
summary: This article explains how to create a custom React hook using TypeScript to manage data with LocalStorage in frontend applications.
published: true
---

While building frontend applications in React, LocalStorage is often used to store data or manage application state. LocalStorage is not reactive in nature, so we usually use the `useState` and `useEffect` hooks to manage data and keep it in sync with what is stored in LocalStorage.

This article will show you how to build a custom React hook with TypeScript to manage data with LocalStorage. This custom hook allows you to get, set, and remove data. This hook will be server-side rendering (SSR) safe and can be used in server-rendered react components. This article assumes you have some knowledge of TypeScript.

> TLDR: The complete source code for the hook is [here](https://gist.github.com/ekrresa/6d155c2702e73a86ba38d82a75ca9aa3).

## Setup

Let’s begin with the input and output of the hook. The code snippet below is our hook definition and return type. It takes two parameters: a key and an initial value. The key is a string because LocalStorage stores keys as strings. The initial value can be of any type, but preferably a type that can be serialised and retain its original structure on deserialisation. This excludes data structures like Map, Set, etc. The initial value is also helpful because the `useState` value type will be inferred from it.

```ts
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = React.useState<T | undefined>(() => initialValue)

  //...
  return [value, update, remove] as const
}
```

We use a `useState` hook to manage our LocalStorage state. This makes any LocalStorage value managed by the hook reactive as we update them with the `set` and `remove` methods. The useState hook is for state management, and LocalStorage provides state persistence.

We follow the `useState` model of returning an array from the hook. This allows for easily renaming the array contents when you call multiple `useLocalStorage` hooks in a component.

`as const` is a typescript technique to narrow down types to their lowest possible type. You can learn more about it [here](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).

We initialised the `useState` hook by returning the initial value from the `useLocalStorage` hook parameters. But we may already have a value associated with the key in LocalStorage, and we want that value to be the initial value returned from the hook. So, let’s modify the `useState` call.

```ts
const [value, setValue] = React.useState<T | undefined>(() => {
  const localStorageValue = localStorage.getItem(key)

  return localStorageValue !== null ? parseJSON(localStorageValue) : initialValue
})
```

In the `useState` initialisation function, we retrieve the value from LocalStorage with the key. If the value is not null, we parse the value with the `parseJSON` function. Otherwise, we return the initial value specified in the `useLocalStorage` hook arguments.

```ts
function parseJSON(value: string) {
  return value === 'undefined' ? undefined : JSON.parse(value)
}
```

`JSON.parse` throws when you call it with `“undefined”` as an argument because it tries to parse it to `undefined` which is not valid JSON. That’s why we need the `parseJSON` function.

## Updating the value

We need a function to edit and store the state value in LocalStorage.

```ts
const update = React.useCallback(
  (newValue: T) => {
    setValue(newValue)

    if (typeof newValue === 'undefined') {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  },
  [key],
)
```

If the new value is undefined, we don’t need to store it in LocalStorage because during deserialisation,`JSON.parse(“undefined”)` will throw an error. Instead, we remove the value stored in LocalStorage and set the state to undefined.

## Removing the value

We use the LocalStorage `removeItem` method to remove the value, passing the key as an argument. We also update the `useState` value with `undefined`, which is the default type of the `useState` value.

```ts
const update = React.useCallback(() => {
  setValue(undefined)
  localStorage.removeItem(key)
}, [key])
```

## Error handling

It isn’t obvious, but errors can occur if we use this hook in its current state. In some browsers, LocalStorage is unavailable or may throw errors when you try to use it. For example, in mobile Safari, when the user is in private mode, `LocalStorage.setItem` throws an error.

We must wrap our LocalStorage-specific code in a try/catch block to prevent such an error. The caveat is that when a LocalStorage error occurs, the LocalStorage value goes out of sync with the `useState` value.

```ts
const set = React.useCallback(
  (newValue: T) => {
    try {
      setValue(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {}
  },
  [key],
)

const remove = React.useCallback(() => {
  try {
    setValue(undefined)
    localStorage.removeItem(key)
  } catch (error) {}
}, [key])
```

We do not need to handle the error in the catch block. This is because `setValue` fires before the error occurs, so the hook value is always correct. We lose state persistence, but the hook always returns the correct value.

## SSR compatibility

In its current form, our hook would only run in the browser. It will throw an error if we try to use it in a server-rendered component. This happens because React runs the `useState` hook on the server where LocalStorage is unavailable. Let’s bring back the `useState` hook.

```ts
const [value, setValue] = React.useState<T | undefined>(() => {
  const localStorageValue = localStorage.getItem(key)

  return localStorageValue !== null ? JSON.parse(localStorageValue) : initialValue
})
```

We must remove the LocalStorage-specific code from the `useState` initialiser function. But that breaks our hook implementation because the initial hook value is no longer derived from LocalStorage.

Let’s derive the initial value in a `useLayoutEffect` hook to rectify this. React does not run `useLayoutEffect` on the server, so it’s perfect for our needs. We chose the `useLayoutEffect` hook instead of the `useEffect` hook to get the initial value because it [runs synchronously before browser paint](https://react.dev/reference/react/useLayoutEffect), unlike the `useEffect` hook, which runs after. Below is the updated code.

```ts
const [value, setValue] = React.useState<T | undefined>(() => initialValue)

React.useLayoutEffect(() => {
  let initialValue

  try {
    const localStorageValue = localStorage.getItem(key)

    initialValue =
      localStorageValue !== null ? parseJSON(localStorageValue) : initialValue

    setValue(initialValue)
  } catch (error) {
    setValue(initialValue)
  }
}, [key])
```

The `useState` initialiser function has been changed to return the initial value passed as an argument to the hook. This keeps the state value stable during server rendering and hydration, so we don’t get hydration errors. After hydration, React runs the `useLayoutEffect` hook, and the state value is updated with what is in LocalStorage if there’s a value for the key.

## Syncing the value across tabs

One final thing: if your web app is open on two or more tabs and you update the hook value on a tab, the other tabs do not receive the update. This is a behaviour associated with LocalStorage. To fix this, we need to subscribe to the [Storage event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event). This event will only fire on the tabs, excluding the one where the changes were made. It’s perfect for fixing this problem.

```ts
React.useEffect(() => {
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) {
      const newValue = e.newValue !== null ? parseJSON(e.newValue) : undefined
      setValue(newValue)
    }
  }

  window.addEventListener('storage', onStorage)

  return () => {
    window.removeEventListener('storage', onStorage)
  }
}, [key])
```

We handle the Storage event in a `useEffect` hook. We check if the `key` in the event matches the key our hook is subscribed to, and then we update the state value.

---

That’s all there is to creating a custom React hook with TypeScript to manage LocalStorage. You could improve on the hook by adding a custom serialiser for your data to handle data types like Maps, Sets, etc.

The complete source code for the hook is [here](https://gist.github.com/ekrresa/6d155c2702e73a86ba38d82a75ca9aa3).
