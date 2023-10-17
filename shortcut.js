class Shortcut {  
  constructor(prompt, callback) {
    this.prompt = prompt
    this.callback = callback
    this.pressedKeys = new Set()
    this.pressedModifiers = new Set()
    this.boundKd = this.kd.bind(this)
    this.boundKu = this.ku.bind(this)
    this.doneOnce = false
    
    document.addEventListener("keydown", this.boundKd)
    document.addEventListener("keyup", this.boundKu)
  }
  
  kd(event) {
    let keys = this.prompt.keys ? this.prompt.keys.map(key => key.toLowerCase()) : []
    this.prompt.keys = keys
    if (this.prompt.keys.includes(event.key.toLowerCase())) {
      this.pressedKeys.add(event.key.toLowerCase())
    }
    
    let map = { alt: "Alt", control: "Control", meta: "Meta", shift: "Shift" }
    for (let [key, value] of Object.entries(map)) {
      if (event.key == value) this.pressedModifiers.add(key)
    }
    
    let hasAllKeys = this.prompt.keys.every(key => this.pressedKeys.has(key))
    let hasAllModifiers = Object.keys(map).every(key => this.prompt.implicit ? (this.pressedModifiers.has(key) === this.prompt[key] || this.prompt[key] == null) : (!!this.pressedModifiers.has(key) === !!this.prompt[key] || this.prompt[key] === null))
        
    if (hasAllKeys && hasAllModifiers && (this.prompt.repeat ? true : !this.doneOnce)) {
      this.callback(event)
      this.doneOnce = true
    }
  }

  ku(event) {
    if (this.prompt.keys.includes(event.key)) this.pressedKeys.delete(event.key)
    let map = { alt: "Alt", control: "Control", meta: "Meta", shift: "Shift" }
    for (let [key, value] of Object.entries(map)) {
      if (event.key == value) this.pressedModifiers.delete(key)
    }
    this.doneOnce = false
  }
  
  kill() {
    document.removeEventListener("keydown", this.boundKd)
    document.removeEventListener("keyup", this.boundKu)
  }
}
