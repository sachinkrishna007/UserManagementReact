import express from "express";

import { adminAuth,registerAdmin,logout,getUsers,deleteUser,updateUserData,BlockUser,UnBlockUser} from "../Controller/adminController.js";




const router = express.Router();
router.post('/auth',adminAuth)
router.post('/',registerAdmin)
router.post('/logout',logout)
router.post('/get-users',getUsers)
router.post('/delete-user',deleteUser)
router.put('/update-user',updateUserData)
router.post('/block-user',BlockUser)
router.post('/unblock-user',UnBlockUser)


export default router;