import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  const { data, error } = await supabase.from('user_progress').select('count', { count: 'exact' });
  
  if (error) {
    console.error('❌ Database error:', error.message);
    if (error.code === 'PGRST116') {
      console.log('💡 Note: The table "user_progress" might not exist yet. Please run the SQL in hosting_guide.md!');
    }
  } else {
    console.log('✅ Supabase connected successfully! Found', data.length, 'entries in user_progress.');
  }
}

testConnection();
