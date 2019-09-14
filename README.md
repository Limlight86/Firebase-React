### Firebase Example - Authentication / Realtime Database

#### What is Firebase

Firebase is a frontend focused datastore that exists out in the cloud and your client can access it directly, you don't need a server, you don't need an api. You get data directly in realtime as you request it. This paradigm is called "Backend as a service", i.e BAAS. With BAAS, you don't need to worry about hosting, google has already done that for you. This makes it stupid easy to share the same database across multiple clients / frontend with very minimal server code written.

#### Important Reading Material

- Data Structuring - https://firebase.google.com/docs/database/web/structure-data?authuser=0
- Reading / Writing - https://firebase.google.com/docs/database/web/read-and-write?authuser=0
- Working with Collections - https://firebase.google.com/docs/database/web/lists-of-data?authuser=0

#### Pros and Cons

- Pros

  - Simplified authentication
  - Realtime data
  - Ready made api
  - Built in security at the data level
  - File storage similar to S3
  - Static file hosting
  - Highly scalable data streaming

- Cons

  - Limited query abilities, no relations
  - Limited custimization

#### Sample Code

##### Config

```
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'fir-tutorial-a8292.firebaseapp.com',
  databaseURL: 'https://fir-tutorial-a8292.firebaseio.com',
  projectId: 'fir-tutorial-a8292',
  storageBucket: '',
  messagingSenderId: '67469922153',
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = firebase.initializeApp(config);
export const database = app.database()
export const auth = app.auth();
```

##### Login

```
const handleLogin = async _ => {
  const { user } = await auth.signInWithEmailAndPassword(email, password)
  if (!user) return history.push('/error-page')
  return history.push('/my-profile')
}
```

##### Signup

```
const handleSignUp = async _ => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  if (!user) return history.push('/error-page')
  return history.push('/login')
}
```

##### Logout

```
const handleSignOut =  _ => auth.signOut();
```

##### Reading (and subscribing) Data

```
const fetchUsers = _ => {
  database.ref('/users').on('value', snapshot => {
    const usersData = snapshot.val() || {} // can be null if no users
    const parsedUsers = Object.values(usersData) // get the array of users
    setUsers(parsedUsers) // set in state
  })
}
```

##### Writing Data

```
const addUser = _ => {
  const userRef = database.ref('/users').push()
  const newUser = { id: userRef.key, email: 'tommy@tommy.com', displayName: 'tommy123', occupation: 'foo' }
  userRef.set(newUser)
}
```
