const phrases = [
  'Hola — bienvenido a mi portafolio',
  'Desarrollador Frontend • React, Next.js',
  'Me encanta optimizar UX y rendimiento'
]

const el = document.getElementById('typing')
let p = 0, ch = 0, forward = true

function step(){
  const str = phrases[p]
  if(forward){
    ch++
    el.textContent = str.slice(0,ch)
    if(ch===str.length){forward=false;setTimeout(step,900);return}
  } else {
    ch--
    el.textContent = str.slice(0,ch)
    if(ch===0){forward=true;p=(p+1)%phrases.length}
  }
  setTimeout(step, forward?80:40)
}

// Circuit background animation
function createCircuitElements(){
  const container = document.getElementById('circuitBg')
  if(!container) return
  
  const lineCount = 20
  const nodeCount = 30
  
  // Create lines
  for(let i=0; i<lineCount; i++){
    const line = document.createElement('div')
    line.className = 'circuit-line'
    const isHorizontal = Math.random() > 0.5
    
    if(isHorizontal){
      line.style.width = `${Math.random()*400 + 150}px`
      line.style.top = `${Math.random()*100}%`
      line.style.left = `${Math.random()*100}%`
      line.style.animationDelay = `${Math.random()*2}s`
    } else {
      line.classList.add('circuit-line--vertical')
      line.style.height = `${Math.random()*400 + 150}px`
      line.style.width = '1px'
      line.style.top = `${Math.random()*100}%`
      line.style.left = `${Math.random()*100}%`
      line.style.background = 'rgba(87,221,255,.15)'
      line.style.animationDelay = `${Math.random()*2}s`
    }
    
    container.appendChild(line)
  }
  
  // Create nodes
  for(let i=0; i<nodeCount; i++){
    const node = document.createElement('div')
    node.className = 'circuit-node'
    node.style.top = `${Math.random()*100}%`
    node.style.left = `${Math.random()*100}%`
    node.style.animationDelay = `${Math.random()*2}s`
    container.appendChild(node)
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  step()
  createCircuitElements()
})
