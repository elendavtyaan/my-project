import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ooyzbdvynxoljjiciumi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9veXpiZHZ5bnhvbGpqaWNpdW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDM2MjEsImV4cCI6MjA0NzUxOTYyMX0.RZfovXV3jFp6-0myL29_wXG45nsrJCm-7V5sWWhHgUQ'
)

// Դասընթացների հետ աշխատող ֆունկցիաներ
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      category:categories(*),
      teachers:course_teachers(
        teacher:teachers(*)
      )
    `)
  
  if (error) throw error
  return data
}

export async function addCourse(courseData) {
  const { data, error } = await supabase
    .from('courses')
    .insert([courseData])
    .select()
  
  if (error) throw error
  return data[0]
}

// Կատեգորիաների ֆունկցիաներ
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
  
  if (error) throw error
  return data
}

// Դասախոսների ֆունկցիաներ
export async function getTeachers() {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
  
  if (error) throw error
  return data
}

// Գրանցումների ֆունկցիաներ
export async function registerForCourse(registrationData) {
  const { data, error } = await supabase
    .from('registrations')
    .insert([registrationData])
    .select()
  
  if (error) throw error
  return data[0]
}

export async function getRegistrations() {
  const { data, error } = await supabase
    .from('registrations')
    .select(`
      *,
      course:courses(*)
    `)
  
  if (error) throw error
  return data
}

// Կապ դասախոսների և դասընթացների միջև
export async function assignTeacherToCourse(courseId, teacherId) {
  const { data, error } = await supabase
    .from('course_teachers')
    .insert([{ course_id: courseId, teacher_id: teacherId }])
  
  if (error) throw error
  return data
}