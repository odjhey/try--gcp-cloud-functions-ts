
import { HttpFunction } from '@google-cloud/functions-framework'
import { http } from '@google-cloud/functions-framework'



// export const hello: HttpFunction = (req, res) => res.send("Hello john!")


http('hello', (req, res) => {
    res.send('eiiii!')
})

http('hello2', (req, res) => {
    res.send('yaharu!')
})