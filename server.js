import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const prisma = new PrismaClient()
const port = 3000

app.use(cors())
app.use(express.json())

// Դասընթացների API
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        features: true
      }
    })
    res.json(courses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Գրանցման API
app.post('/api/register', async (req, res) => {
  try {
    const registration = await prisma.registration.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        courseId: parseInt(req.body.courseId)
      }
    })
    res.json(registration)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})