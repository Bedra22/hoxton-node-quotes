import express, { response } from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
const app = express()
const port = 5000


const db = Database('./db/data.db', { verbose: console.log })

app.use(cors())
app.use(express.json())

const getQoutes = db.prepare(`
SELECT * FROM qoute;
`)

const selectQouteById = db.prepare(`
SELECT * FROM qoute where id=?;
`)

const createNewQoute = db.prepare(`
INSERT INTO qoute (firstName,lastName,age,image,qoute) VALUES (?,?,?,?,?);
`)

const updateQoute = db.prepare(`
UPDATE qoute SET firstName=? ,lastName=? ,age=? ,image=? ,qoute=? WHERE id=?
`)

const deleteQoute = db.prepare(`
DELETE FROM qoute WHERE id=?;
`)

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to my Qoutes :)</h1>
    <ul>
      <li><a href="/qoutes">Quotes</a></li>
    </ul>
  `)
})

app.get('/qoutes', (req, res) => {
  const qoutes = getQoutes.all()
  res.send(qoutes)
})

app.get('/random', (req, res) => {
  const quotes = getQoutes.all()
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  res.send(randomQuote)
})

app.get('/qoutes/:id', (req, res) => {
  const id = Number(req.params.id)
  const findMatch = selectQouteById.get(id)

  if (findMatch) {
    res.send(findMatch)
  } else {
    res.status(404).send(`
        <h1>Error! Not Found</h1>`)
  }
})

app.post('/qoutes', (req, res) => {

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const age = req.body.age
  const image = req.body.image
  const qoute = req.body.qoute

  let errors: string[] = []
  if (typeof firstName !== 'string') {
    errors.push('There is an error with first name')
  }

  if (typeof lastName !== 'string') {
    errors.push('There is an error with last name')
  }

  if (typeof age !== 'string') {
    errors.push('There is an error with age')
  }

  if (typeof image !== 'string') {
    errors.push('There is an error with image')
  }

  if (typeof qoute !== 'string') {
    errors.push('There is an error with qoute')
  }
  if (errors.length === 0) {
    const infoAboutNewQoute = createNewQoute.run(firstName, lastName, age, image, qoute)
    const qouteThatIsNew = selectQouteById.get(infoAboutNewQoute.lastInsertRowid)
    res.send(qouteThatIsNew)
  } else {
    res.status(404).send(errors)
  }
})

app.patch('/qoutes/:id', (req, res) => {

  let id = Number(req.params.id)
  let findMatch = updateQoute.get(
    req.body.firstName,
    req.body.lastName,
    req.body.age,
    req.body.image,
    req.body.qoute,
    id
  )

  if (findMatch) {

    res.send(findMatch)
  } else {
    res.status(404).send({ error: " Not found" })
  }
})

// app.delete('/qoute/:id', (req, res) => {

//   let id = Number(req.params.id)
//   let deletedQoute = deleteQoute.get(id)

//   if (deletedQoute) {
//     res.send('We deleted this qoute successfully')
//   } else {
//     res.status(404).send({ error: "We can't delete this qoute" })
//   }
// })

app.listen(port, () => {
  console.log(`We are logging at http://localhost:${port}/`)
})