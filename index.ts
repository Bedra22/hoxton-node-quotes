import express from 'express'

const app = express()
const port = 3000

const qoutes = [
    {
        id: 1,
        personWhoSaidTheQoute: ' Lee Argus',
        qoute: '“Life is fragile and temporary. The faces of today quickly become the faces of the past. Sorrow, pain, and anger... it all fades-except love. Love is forever and there after, even when we have fallen to our graves.”'
    },
    {
        id: 2,
        personWhoSaidTheQoute: 'Eleanor Roosevelt',
        qoute: '“Learn from the mistakes of others. You can not live long enough to make them all yourself.”'
    },
    {
        id: 3,
        personWhoSaidTheQoute: 'John Lennon',
        qoute: '“You may say I am a dreamer, but I am not the only one. I hope someday you will join us.And the world will live as one.”'
    },
    {
        id: 4,
        personWhoSaidTheQoute: 'Socrates',
        qoute: '“The unexamined life is not worth living.”'
    },
    {
        id: 5,
        personWhoSaidTheQoute: 'J.R.R. Tolkien, The Fellowship of the Ring',
        qoute: '“I wish it need not have happened in my time," said Frodo. "So do I," said Gandalf, "and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.”'
    },
    {
        id: 6,
        personWhoSaidTheQoute: 'Bill Keane',
        qoute: '“Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.”'
    },
]

app.get('/', (req, res) => {
    res.send("Hello to The qoutes :)")
})

app.get('/qoutes', (req, res) => {
    res.send(qoutes)
})

app.listen(port, () => {
    console.log('We are logging')
})