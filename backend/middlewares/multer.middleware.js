import multer from 'multer'
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const suffix = Date.now()
        cb(null,file.originalname+'-'+suffix)
    }
})
const fileFilter = (req,file,cb) => {
    console.log("file mimtype : ", file.mimetype)
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else{
        cb(new Error("only jpeg or png file are accepted"),false)
    }
}
export const upload = multer({
    storage:storage,
    limits:{ fileSize: 1 * 1024 * 1024 * 10 },
    fileFilter:fileFilter
})