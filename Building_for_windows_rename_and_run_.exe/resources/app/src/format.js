const lineByLine = require('n-readlines');;
const fs = require('fs');

module.exports = class formats{
    constructor(path,reg){
        this.today = new Date().toISOString().slice(0, 10)
        this.fileUploadName = document.getElementById('avatar').files[0].name
        this.newFile = (__dirname +`/Files_formatted/${this.today}_${this.fileUploadName}`).replace(/\\/g,'/')
        this.mkdirPath = (__dirname + '/Files_formatted').replace(/\\/g,'/')
        this.file = path.replace(/\\/g,'/')
        this.regex = new RegExp(reg.replace(/ +/g,'|'),'g')
        this.formatage()
    }


    formatage(){
        if (!fs.existsSync(this.mkdirPath)){
            fs.mkdirSync(this.mkdirPath)
            this.generateLog("[✓] - The new path containing the formatter files has been created " + this.file)
        }else if(fs.existsSync(this.newFile)){
            var random = Math.floor(Math.random() * 1000)
            try {
                var path = __dirname +`/Files_formatted/` + random.toString() +"_"+ this.today + this.fileUploadName
                fs.openSync(path,'a')
                this.newFile = path
            }catch(err){
                this.generateLog("[!] - Unable to create file or access path " + path)
            }
        }

        const liner = new lineByLine(this.file)
            this.int = setInterval( ()=>{
                try{
                    var line = new Buffer.from(liner.next()).toString()
                    var lineRegex = line.replace(this.regex,' ').replace(/ +/g,' ') + "\n"
                    fs.appendFileSync(this.newFile, lineRegex); 
                }catch (err){
                    clearInterval(this.int)
                    this.generateLog("[✓] - The file was successfully formatted " + this.newFile)
                }
            },100)
    }

    generateLog(text){
        var log = document.getElementById('log').contentWindow.document.body
        log.appendChild(document.createElement("p"))
        log.lastChild.innerText = text
    }
}
