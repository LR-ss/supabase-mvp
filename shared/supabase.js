import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://ggyjxqtyberzholxouqa.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdneWp4cXR5YmVyemhvbHhvdXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjE2NzAsImV4cCI6MjA5ODk5NzY3MH0.8_aKQmC-uP2FMleIJqTtVLtLaqhPVesC2m65zzuAAyU";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);