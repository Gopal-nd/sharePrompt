import mongoos from "mongoose";
 let isConnected = false;

 export const  connectTODB = async ()=>{
    mongoos.set("strictQuery",true);
    if(isConnected){
        console.log("connected");
        return
    }
    try {
        await mongoos.connect(process.env.MONGODB_URL,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected = true;
        console.log('mongoDB connected')
        
        
    } catch (error) {
        console.log(error);
    }

 }