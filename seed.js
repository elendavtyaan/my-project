const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://ooyzbdvynxoljjiciumi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9veXpiZHZ5bnhvbGpqaWNpdW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDM2MjEsImV4cCI6MjA0NzUxOTYyMX0.RZfovXV3jFp6-0myL29_wXG45nsrJCm-7V5sWWhHgUQ'
)

async function seedDatabase() {
  // Ավելացնում ենք դասընթացները
  const { data: courses, error } = await supabase
    .from('courses')
    .insert([
      {
        title: 'JavaScript ծրագրավորում',
        image: 'images/courses/javascript.svg',
        badge: 'Ամենապահանջված',
        description: 'Սովորիր ժամանակակից JavaScript՝ React և Node.js շրջանակներով',
        duration: '6 ամիս',
        schedule: 'Երեկոյան դասեր',
        price: '45,000 դրամ/ամիս'
      },
      {
        title: 'Python ծրագրավորում',
        image: 'images/courses/python.svg',
        badge: 'Նոր դասընթաց',
        description: 'Python ծրագրավորում՝ Django և մեքենայական ուսուցում',
        duration: '6 ամիս', 
        schedule: 'Երեկոյան դասեր',
        price: '40,000 դրամ/ամիս'
      }
    ])

  if (error) {
    console.error('Error seeding courses:', error)
    return
  }

  console.log('Database seeded successfully:', courses)
}

seedDatabase()