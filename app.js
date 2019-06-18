const fs = require ('fs')
const file = fs.readFileSync("app.json").toString()
const JsonFile = JSON.parse(file);

// List
function list(){
    for ( el of JsonFile){
    console.log(' Title:', el.Title, '\n Body:', el.Body ,'\n')
    }

}

// help
function help() {
    console.log('node app.js --help \t\t\t\t\t Help Me')
    console.log('node app.js list \t\t\t\t\t My List ')
    console.log('node app.js add --title your_title --body todo_body \t Add a note')
    console.log('node app.js read --title your_title \t\t\t Read a note ')
    console.log('node app.js remove --title your_title \t\t\t Remove a note')
}

// add
function add() {
    let newnote = {}
  
    let indexTitle = process.argv.findIndex((el) => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
      console.log('Missing : --title')
      return
    }
    else newnote['Title'] = process.argv[indexTitle + 1]
  
    let indexBody = process.argv.findIndex((el) => el === '--body')
    if (indexBody === -1 || typeof process.argv[indexBody + 1] === 'undefined') {
      console.log('Missing : --body')
      return
    }
    else newnote['Body'] = process.argv[indexBody + 1]
  
    let todos = JSON.parse(fs.readFileSync('app.json').toString());
  
    fs.writeFileSync('app.json', JSON.stringify(todos.concat([newnote])))
  }


  // remove
  function remove() {

    let title = ''
  
    let indexTitle = process.argv.findIndex((el) => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
      console.log('Missing : --title')
      return
    }
    else title = process.argv[indexTitle + 1]
  
    let todos = JSON.parse(fs.readFileSync('app.json').toString());
    let todo = todos.find(x => x.Title === title)
    todos.splice(todos.indexOf(todos.find(x => x.Title === title)), 1);
  
    fs.writeFileSync('app.json', JSON.stringify(todos))
    console.log('Todo: - Title:', todo.Title, ', - Body:', todo.Body, 'removed successfully')
  }
  

// export functions
switch (process.argv[2]) {
    case '--help': help(); break;
    case 'list': list(); break;
    case 'add': add(); break;
    case 'remove': remove(); break;
    default: help(); break;
  }
  
  