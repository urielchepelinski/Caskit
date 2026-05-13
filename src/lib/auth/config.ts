import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import type { Provider } from 'next-auth/providers'
import Google from 'next-auth/providers/google'
import Apple from 'next-auth/providers/apple'
import Resend from 'next-auth/providers/resend'
import Credentials from 'next-auth/providers/credentials'

function buildProviders(): Provider[] {
  const providers: Provider[] = []

  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push(
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      })
    )
  }

  if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
    providers.push(
      Apple({
        clientId: process.env.APPLE_CLIENT_ID,
        clientSecret: process.env.APPLE_CLIENT_SECRET,
      })
    )
  }

  if (process.env.RESEND_API_KEY) {
    providers.push(
      Resend({
        from: 'Caskit <noreply@caskit.app>',
      })
    )
  }

  // Email + password login — validates against DB
  providers.push(
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string
        if (!email || !password) return null

        try {
          const { db } = await import('@/db')
          const { users } = await import('@/db/schema')
          const { eq } = await import('drizzle-orm')
          const { verifyPassword } = await import('@/lib/auth/password')

          const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
          if (!user || !user.passwordHash) return null

          const valid = await verifyPassword(password, user.passwordHash)
          if (!valid) return null

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatarUrl,
          }
        } catch {
          return null
        }
      },
    })
  )

  return providers
}

export const providers = buildProviders()

export const availableProviders = {
  google: !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
  apple: !!(process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET),
  email: !!process.env.RESEND_API_KEY,
  credentials: true, // Email + password login always available
}

export const authConfig: NextAuthConfig = {
  providers,
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET!,
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
