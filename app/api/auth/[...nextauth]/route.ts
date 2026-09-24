import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'mr-news-nextauth-secret-key-2026',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// MR NEWS — Executive Morning Intelligence Platform
