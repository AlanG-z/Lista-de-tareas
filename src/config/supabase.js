const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_KEY deben estar configuradas');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
