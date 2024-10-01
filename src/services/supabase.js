import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pwrfjejoyxieuwfbpvni.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cmZqZWpveXhpZXV3ZmJwdm5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5Nzg5NjgsImV4cCI6MjA0MjU1NDk2OH0.VPbUDKteyIvzRVJQZLstkQEBmqrwyZKpLRnLUOtAZIQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
