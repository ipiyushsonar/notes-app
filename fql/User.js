import { 
  Client,
  Create,
  Collection,
  Login,
  Match,
  Index,
  Let,
  Select,
  Paginate,
  Var
} from "faunadb"


const client = new Client({ 
  secret: process.env.NEXT_PUBLIC_FAUNA_SECRET_KEY,
  domain: 'db.us.fauna.com'
})

export async function UserRegistration(username, email, password) {
  return await client.query(
    Create(
      Collection("User"),
      {
        credentials: { password: password },
        data: {
          username: username,
          email: email,
        },
      }
    )
  )
}

export async function UserLogin(email, password) {
  return await client.query(
    Let(
      {
        credentials: Login(
          Match(Index("user_by_email"), email),
          { password: password },
        )
      },
      {
        secret: Select("secret", Var("credentials")),
        user: Select(
          0,
          Paginate(Match(Index("user_by_email"), email))
        ),
      }
    )
  )
}