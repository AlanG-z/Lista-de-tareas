const api = 'sb_publishable_FQoG7_Slv6w3nI0DH0mwMw_EXwbEOaY'
const API_URL ='https://guiadvisfswrvgglrfwa.supabase.co/rest/v1/tareas' 

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://guiadvisfswrvgglrfwa.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)