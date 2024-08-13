
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ydodpiylmiwndjzulbbw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkb2RwaXlsbWl3bmRqenVsYmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1NDY4MzksImV4cCI6MjAzOTEyMjgzOX0.UOaEzZzXrybTSm0RLMYQRA00IKLGJ2_Aaeg3ygytWXE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
