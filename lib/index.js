import { createClient } from "@supabase/supabase-js";

// const NEXT_PUBLIC_SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYWl3ZnhsdXZ3b2xjY3RqYWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1ODUzMzEsImV4cCI6MTk5NTE2MTMzMX0.EdkhFm1wog0MUaBWKG7uggGGpBjmJ8MYEAy6KbcaQss`;

// const NEXT_PUBLIC_SUPABASE_URL = `https://eiaiwfxluvwolcctjaae.supabase.co`;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;
