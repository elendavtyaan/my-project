const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Ջնջում ենք գոյություն ունեցող տվյալները
  await prisma.feature.deleteMany()
  await prisma.course.deleteMany()

  // Ստեղծում ենք նոր դասընթացներ
  const javascript = await prisma.course.create({
    data: {
      title: "JavaScript ծրագրավորում",
      image: "images/courses/javascript.svg",
      badge: "Ամենապահանջված",
      description: "Սովորիր ժամանակակից JavaScript՝ React և Node.js շրջանակներով",
      duration: "6 ամիս",
      schedule: "Երեկոյան դասեր",
      price: "45,000 դրամ/ամիս",
      features: {
        create: [
          { name: "96 դաս" },
          { name: "Պրակտիկ նախագծեր" },
          { name: "Կարիերայի խորհրդատվություն" }
        ]
      }
    }
  })

  const python = await prisma.course.create({
    data: {
      title: "Python ծրագրավորում",
      image: "images/courses/python.svg",
      badge: "Նոր դասընթաց",
      description: "Python ծրագրավորում՝ Django և մեքենայական ուսուցում",
      duration: "6 ամիս",
      schedule: "Երեկոյան դասեր",
      price: "40,000 դրամ/ամիս",
      features: {
        create: [
          { name: "96 դաս" },
          { name: "Անհատական մոտեցում" },
          { name: "Պրակտիկայի հնարավորություն" }
        ]
      }
    }
  })

  console.log('Տվյալների բազան հաջողությամբ լցվեց')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })