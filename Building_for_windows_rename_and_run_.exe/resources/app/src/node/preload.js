const { contextBridge} = require('electron')
const formats = require('../format')

contextBridge.exposeInMainWorld('nayFormBridge', {
  run: () => new bridge(),
  // we can also expose variables, not just functions
})

class bridge{
  constructor(){
    this.path = document.getElementById('avatar').files[0].path.toString()
    this.reg = document.getElementById('Reg').value
    this.asyncConstructor()
  }

  async asyncConstructor(){
    await this.check(this.path)
    await this.check(this.reg)
    await this.running()
  }

  async check(input){
    return new Promise((resolve,reject)=>{
        if (input.length >= 1){
          resolve(input)
        }else{
          reject(this.generateLog("[!] - No deletion fill in, do not forget the spaces between each desired deletion"))
        }
    })
  }
  async running(){
   new formats(this.path,this.reg)
  }

  generateLog(text){
    var log = document.getElementById('log').contentWindow.document.body
    log.appendChild(document.createElement("p"))
    log.lastChild.innerText = text
  }
}

