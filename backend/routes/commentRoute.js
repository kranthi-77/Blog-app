
import express from 'express'

const router =express.Router()

router.get('/post',(req,res)=>{
    res.send('My app is running')
})

export default router