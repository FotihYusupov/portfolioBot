import keyboardsNames from "./keyboards.names.js"
import fs from 'fs'
import path from "path"

const allProjects = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'model', 'projects.json')))

let projects = []

for(let i = 0; i < allProjects.length; i += 2) {
    let arr = []

    if(allProjects[i]) {
        arr.push(allProjects[i].name, allProjects[i + 1]?.name)
    }

    projects.push(arr.filter(e => e))
}

projects.push([ keyboardsNames.main_menu])

export default {
    menu: [
        [ keyboardsNames.our_courses, keyboardsNames.contact],
        [ keyboardsNames.telephone]
    ],
    projects
}