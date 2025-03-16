import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string | null;
      image: string | null;
      name: string | null;
    };
    expires: string;
    sub: string | null;
    id: string | null;
    token: {
      access_token: string | null;
      avatar_url: string | null;
      bio: string | null;
      blog: string | null;
      collaborators: number | null;
      company: string | null;
      created_at: string | null;
      disk_usage: number | null;
      email: string | null;
      events_url: string | null;
      exp: number | null;
      followers: number | null;
      followers_url: string | null;
      following: number | null;
      following_url: string | null;
      gists_url: string | null;
      gravatar_id: string | null;
      hireable: boolean | null;
      html_url: string | null;
      iat: number | null;
      id: number | string | null;
      image: string | null;
      jti: string | null;
      location: string | null;
      login: string | null;
      name: string | null;
      node_id: string | null;
      notification_email: string | null;
      organizations_url: string | null;
      owned_private_repos: number | null;
      picture: string | null;
      plan: {
        name: string | null;
        space: number | null;
        collaborators: number | null;
        private_repos: number | null;
      } | null;
      private_gists: number | null;
      provider: string | null;
      providerAccountId: string | null;
      public_gists: number | null;
      public_repos: number | null;
      received_events_url: string | null;
      repos_url: string | null;
      scope: string | null;
      site_admin: boolean | null;
      starred_url: string | null;
      sub: string | null;
      subscriptions_url: string | null;
      token_type: string | null;
      total_private_repos: number | null;
      twitter_username: string | null;
      two_factor_authentication: boolean | null;
      type: string | null;
      updated_at: string | null;
      url: string | null;
      user_view_type: string | null;
    };
  }
}
