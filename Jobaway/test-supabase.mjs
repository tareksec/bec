import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ftnsmipoxbvjoyvdanpf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bnNtaXBveGJ2am95dmRhbnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMzA1NTAsImV4cCI6MjEwMjcwNjU1MH0.7zDwf4epbZ3Ou1yFYMgLu_vCmQT0D84MYILu4kTGkPk'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const { data, error } = await supabase.from('posts').select('*')
  if (error) {
    console.error("Error:", error)
  } else {
    console.log("Success. Rows:", data.length)
    if (data.length > 0) {
      console.log("Keys of first row:", Object.keys(data[0]))
    }
  }
}

test()
