let Inputarr = process.argv.slice(2);
// console.log(Inputarr);
let fs = require('fs') // file system module
let path = require('path'); // path module

let command = Inputarr[0];
let types = {
    Video:["mp4","mkv"],
    images:['png','jpg'],
    Audio:["M4A","FLAC","MP3","MP4","WAV","WMA","AAC"],
    zip:['rar','zip','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xls','xlsx','odt','ods','odg','odf','txt','ps'],
    app:['exe','dmg','pkg','deb'],
    CodingFiles:['c','cpp','java','js']
}
switch(command)
{
    case "tree":
        // console.log('Tree'); 
        treeFn(Inputarr[1]);
        break;
        
    case "organize":
        // console.log('Organize');
        organizeFn(Inputarr[1]); 
        break;
        
    case "help":
        console.log(':::::::::::::::::::::::Help:::::::::::::::::'); 
        helpFn();
        break;

    default:
       console.log('plz write right command'); 
       break;   
}


function treeFn(dirpath){
    console.log("Tree fn",dirpath);
}

function organizeFn(dirpath){
    // console.log("organize fn",dirpath);
    // to organize file:
    // 1. make a "organized_file " folder in root folder wher all files are stored 
    let organizedFileAddress;
       if(dirpath==undefined){
         console.log('The path given is incorrct/or missing');
         return;
       }
       else{
        let isExist = fs.existsSync(dirpath);   
        if(isExist)
        {
        
              organizedFileAddress = path.join(dirpath,'organized_files')
              if(fs.existsSync(organizedFileAddress)==false)
                 fs.mkdirSync(organizedFileAddress);
               
            // console.log(organizedFileAddress);
        }
        else
         console.log('The path is not exist');
       }  
    // 2. read/check all files extention.
      
    organizehelper(dirpath,organizedFileAddress);
    // 3. make sub folders inside organized folder and copy files according to there extention type.
}


function organizehelper(src,dest)
{
  // 2. read/check all files extention.
   let allfiles = fs.readdirSync(src);

 
     for(let i = 0 ; i<allfiles.length;i++)
     {
        let currFilePath = path.join(src,allfiles[i]);
        let fileName = path.basename(currFilePath);
        let isFile = fs.lstatSync(currFilePath).isFile();
        if(isFile)
        {
            let category = getcategory(currFilePath);
            console.log(fileName,"----->",category,' folder');
            // yaha tk mere pass file ka src, file ka copy path , file ka cotegory aa gya hai
            // ab bss mujhe uss file ko copy krna hai organiszed folder k andar;
            sendFile(currFilePath,dest,category);
        }
     }
}
function sendFile(srcpath,dest,category){
    
    
    let orginaldestfolder = path.join(dest,category);
    let isExist = fs.existsSync(orginaldestfolder);
    if(!isExist)
      fs.mkdirSync(orginaldestfolder);
    
      let fileName = path.basename(srcpath);
     
      let oldfile = srcpath;                                    //purani file ka nam
      let newfile = path.join(orginaldestfolder,fileName);      //new file ka naam jaha pr purani copy krni hai

    fs.copyFileSync(oldfile,newfile); 
     
}
function getcategory(file)
{
   let fileExtention =  path.extname(file);
    fileExtention = (fileExtention.slice(1));
     
    for(let type  in  types)
    {
        let ctypeArr = types[type];
        for(let i = 0 ; i<ctypeArr.length;i++)
        {
            if(fileExtention==ctypeArr[i])
              return type;
        }
    }
    return 'others';
}
//my help function:
function helpFn(){
    console.log("plz follows below command");
 
    console.log("node main.js tree 'directoryPath' ");
    console.log("node main.js organize 'directoryPath' ");
    console.log("node main.js help ");
}
