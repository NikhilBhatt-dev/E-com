

//Routes for user login
const loginUser = async (req, res) => {


}    

//routes for user register
const registerUser = async (req, res) => {
   try{
    const {name,email,password} = req.body;

    //checking user alerdy exits or not
    const exits = await userModel.findOne({email})
    if(exits){
        return res.json({success:false, message:'User already exits'})
    }
   }

   //validation email format and strog password

}

//route for admin login

const adminLogin = async (req, res) => {    

}

export {loginUser, registerUser,adminLogin}