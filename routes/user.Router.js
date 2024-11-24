 let router=require ('express').Router()

let UserCtrl=require('../controlles/userControl')
// router.post('/user',UserCtrl.add)
// router.post('/division',UserCtrl.Division)
// router.post('/multiplication',UserCtrl.Multiplication)
router.post('/user',UserCtrl.inscrit)

router.get('/allUser',UserCtrl.allUser)
router.get('/user/:id',UserCtrl.getUserById)
router.post('/userbyId',UserCtrl.getUserId)
router.delete('/user/:id',UserCtrl.deleteUser)
router.put('/user',UserCtrl.updateUser)
router.put('/nvPassword',UserCtrl.updatePassword)
module.exports=router