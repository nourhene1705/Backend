const { get } = require("mongoose");
let user = require("../models/UserModel");
let bcrypt = require("bcrypt");
const UserCtrl = {
  // add:async(req,res)=>{
  //     try{
  //         let {a,b}=req.body
  //         if (!a) return res.status(302).json({msg:"a est obligatoire"})
  //             if (!b) return res.status(302).json({msg:"b est obligatoire"})
  //         let resultat=a+b
  //         res.json({resultat:a+b})

  //     }catch (error) {
  //         return res.status(500).json ({msg:error.message})
  //     }

  // },

  // Division:async(req,res)=>{
  //     try{
  //         let{a,b}=req.body
  //         if(!a) return res.status(302).json({msg:"a est obligatoire"})
  //             if(b===0)return res.status(302).json({msg:"b !==0"})
  //                 res.json({resultat:a/b})
  //     }catch(error){
  //         return res.status(500).json({msg:error.message})
  //     }
  // },
  // Multiplication:async(req,res)=>{
  //     try {
  //         let {a,b}=req.body
  //         if(!a) return res.status(302).json({msg:"a est obligatoire"})
  //             if(!b)return res.status(302).json({msg:"b est obligatoire"})
  //                 res.json({resultat:a*b})

  //     } catch (error) {

  //          return res.status(500).json({msg:error.message})
  //     }
  // }

  inscrit: async (req, res) => {
    try {
      let { nom, prenom, email, password } = req.body;
      //recherche user par email
      let findUser = await user.findOne({ email });
      //verifier si user existe
      if (findUser) return res.status(302).json({ msg: "email deja existe" });
      //verifier champ nom est existe
      if (!nom) return res.status(302).json({ msg: "nom est obligatoire" });
      //verifier champ prenom est existe
      if (!prenom)
        return res.status(302).json({ msg: "prenom est obligatoire" });
      //crypte password
      let passwordHash = await bcrypt.hash(password, 10);

      //creation new objet user

      let newUser = new user({ nom, prenom, email, password: passwordHash });
      //enregistrer user dans BDD
      await newUser.save();
      res.json({
        result: newUser,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  allUser: async (req, res) => {
    try {
      let findUser = await user.find();
      res.json({ result: findUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      let { id } = req.params;
      let findUser = await user.findById({ _id: id });
      res.json({ result: findUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserId: async (req, res) => {
    try {
      let { id } = req.body;
      let findUser = await user.findById({ _id: id });
      res.json({ result: findUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      let { id } = req.params;
      let finsUser = await user.findByIdAndDelete({ _id: id });
      res.json({ result: user.findUser, msg: "user deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      let { id, nom, prenom, email } = req.body;
      let findUser = await user.findByIdAndUpdate(
        { _id: id },
        { nom, prenom, email }
      );
      res.json({ result: findUser, msg: "user updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePassword: async (req, res) => {
    try {
      let { id, password, nvPassword, confirmPassword } = req.body
      let findUser = await user.findById({ _id: id })
      let comparPassword = await bcrypt.compare(password, findUser.password);
      if (!comparPassword)
        return res.status(302).json({ msg: "mot de passe incorrect" });
      if (nvPassword !== confirmPassword)
        return res
          .status(302)
          .json({ msg: "nvpassword et confirmPassword different" });
          let passwordHash = await bcrypt.hash(nvPassword,10)
          await user. findByIdAndUpdate({_id:id},{password:passwordHash})
          res.json({msg:"password update"})

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = UserCtrl;
