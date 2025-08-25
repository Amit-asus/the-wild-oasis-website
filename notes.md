# lect 465 and 466 not clear

# Key Points from Lectures

## 1. Fetch Data in Server Components

Fetch data in **Server Components** and pass it to **Client Components** for better performance.

**Example:**

```jsx
// Server Component
async function Page() {
  const data = await fetch("https://api.example.com/data").then((res) =>
    res.json()
  );
  return <ClientComponent data={data} />;
}

// Client Component
("use client");
function ClientComponent({ data }) {
  return <div>{data.name}</div>;
}
```

## 2. Use `Promise.all` for Independent Fetches

Avoid sequential `await` for independent data fetches. Use `Promise.all` to fetch concurrently.

**Example:**

```javascript
// Bad: Sequential
async function fetchData() {
  const users = await fetch("/api/users").then((res) => res.json());
  const posts = await fetch("/api/posts").then((res) => res.json());
}

// Good: Concurrent
async function fetchData() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then((res) => res.json()),
    fetch("/api/posts").then((res) => res.json()),
  ]);
}
```

## Quick Tips

- **Server Components**: Fetch data, reduce client-side load.
- **Promise.all**: Speeds up independent fetches.
- **Error Handling**: Use try-catch with `Promise.all`.

---

---

---

## 3. Why Use `<Suspense>` in React/Next.js?

`<Suspense>` shows a loading UI (like a spinner) while a component waits for data. It makes your app feel fast and smooth.

**Example:**

```jsx
<Suspense fallback={<Spinner />}>
  <Reservation cabin={cabin} />
</Suspense>
```

## Key Points

- **What it does**: Shows `<Spinner />` while `<Reservation>` loads data.
- **Why use it**: Avoids blank screens, improves user experience.
- **When to use**: For components fetching data (e.g., API calls in Server Components).
- **Granular Approach**: Use multiple `<Suspense>` for different UI parts to load them separately, keeping other parts interactive.
- **How it works**: Wraps async components; shows fallback until data is ready.

## Simple Example

```jsx
// Server Component
async function Reservation({ cabin }) {
  const data = await fetch(`/api/cabin/${cabin.id}`); // Fetch data
  return <div>{data.name}</div>;
}

// Parent Component
function Page() {
  const cabin = { id: 1 };
  return (
    <Suspense fallback={<Spinner />}>
      <Reservation cabin={cabin} />
    </Suspense>
  );
}
```

## Tips

- Use simple fallbacks like `<Spinner />`.
- if the page loads user may immediatly see some part of data and the other data will be showing the fallback
- Loads UI parts separately (granular approach).
- Use for Server Components or async data fetching.
- not blocking the entire ui showing the some part and then later show the other part
- Add multiple `<Suspense>` for different UI sections to load independently.

### important notes

---

### 🔑 How to share state between sibling components

1. **Lift state up** → put state in parent, pass it down as props.
2. **URL (search params / route)** → if state should stay after refresh or shareable.
3. **Context** → if many components need the same state.
4. **Global store (Redux/Zustand)** → for big apps, complex state.
5. **Server/DB** → if many users share the same data.
6. **localStorage/sessionStorage** → if you want to keep data after refresh (but not in URL).

---

👉 Rule:

- Small app → use parent.
- Need refresh/share → use URL or storage.
- Many components → use Context/store.
- Across users → server/DB.

---

### [...something] / routes.js

- this is the folder name whatever comes
- after this will be handled by the routes.js file

//lect 471

- Middleware is a some sort of program that sits between the 2 incoming req
  and the response
- in the next application it runs before every single app route
- use of the middleware

1. read and ser cookies and headers
2. authentication and authorization
3. server-side analytics
4. redirect based on geolocation

## next js blocks the image from the external source in order to allow that we need to specify in the next config file

# use optimistic ui - to give the user the better ui experience
