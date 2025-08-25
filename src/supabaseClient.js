import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://csbcfhwdpstnofvsfqwh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzYmNmaHdkcHN0bm9mdnNmcXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjkzODcsImV4cCI6MjA3MTcwNTM4N30.lX166U64tFeqKd6snFduL-oXWD_LXwzPMyQYVF3g8ek';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
