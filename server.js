const express = require('express')
const morgan = require('morgan')
const app = express()
const {sequelize,Teacher,Course} = require('./models')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// async function main(){
//   try{
    
//   }catch(e){
//     console.log(e.message)

//   }
  
// }
// main()
// const db = require('./db')

// const PORT = process.env.PORT || 5000
app.get('/',(req,res)=>{
  res.send("Hello World!")
})

app.get('/getteacher',async (req,res)=> {
  try{
  const user = await Teacher.findAll()
  res.json(user)
  }catch(e){
    res.send({
      status:400,
      message:e.message
    })
  }
})

app.post('/createteacher', async (req, res) => {
  const {first_name,last_name,date_of_birth} = req.body
  
  try{
    const teacherdata = await Teacher.create({first_name,last_name,date_of_birth})
    res.json(teacherdata)
  }catch(e){
    console.log(e.message)
    res.send({
      status:400,
      message:e.message
    })
  }

app.post('/createcourse',async (req,res) => {
  const {teacherUuid,course_name,course_description} = req.body
  try{
    const teacher = await Teacher.findOne({where:{uuid:teacherUuid}})
    
    const course = await Course.create({course_name,course_description,userId:teacher.id})
    return res.json(course)
  }catch(e){
    console.log(e)
    return res.status(500).json(e.message)
  }
})

app.get('/getcourse', async (req, res) => {
  try {
    const course = await Course.findAll({ include: 'teacher' })
    return res.json(course)
  } catch (e) {
    res.send({
      status:400,
      message:e.message
    })
  }
})

 
  // try{
  // const teacher = await db{'teacher').insert({ first_name: req.body.f}rst_name ,last_name:req.body.last_name,date_of_birth:req.body.date_of_birth})
  // res.json(teacher)
  // }catch(e){
  //   res.send({
  //     status:400,
  //     message:e.message
  //   })
  // }


})

// app.post('/createcourse',async (req,res)=>{
//   const teacherID = await db.select('id').from('teacher').where({first_name:req.body.first_name}).returning('id')
//   //const course = await db('course').insert({course_name:req.body.course_name},{course_description:req.body.course_description},{teacher:teacherID})
//   console.log(teacherID)
// })

// app.get('/getteacher', async (req, res) => {
//   const teacher = await db.select().from('teacher')
//   res.json(teacher)
// })

// app.get('/getcourse', async (req, res) => {
//   const course = await db.select().from('course')
//   res.json(course)
// })

app.listen(5000, async () => {console.log('Server up at http://localhost:5000')

try{
  await sequelize.sync({force:true})
  console.log("Database connected")
}catch(e){
  console.log(e.message)
}

})
