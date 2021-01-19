import React, {useEffect, useState} from 'react'
import './styles.css'

const Admin = () => {
    const [tasks, setTasks] = useState([])
    const [newtasking, setNewTasking] = useState([])
    useEffect(()=>{
        fetch('https://tasks52.herokuapp.com/all-tasks',{method: "get", headers: {"mode":"no-cors", "Access-Control-Allow-Origin": "*"}}).then(ans=> ans.json()).then(realans=> setTasks(realans.tasks))
    }, [])

    const deleteTasking = (task) => {
        fetch('https://tasks52.herokuapp.com/change-task',{method: "post", headers: {"mode":"no-cors", "Content-Type":"application/json", "Access-Control-Allow-Origin": "*"}, body: JSON.stringify({id: 1, event: 'delete', task: task})}).then(ans=> ans.json()).then(realans=> console.log(realans))
        setTasks(tasks.filter(item => item !== task))
    }

    const addNewTasking = () => {
        fetch('https://tasks52.herokuapp.com/change-task',{method: "post", headers: {"mode":"no-cors", "Content-Type":"application/json", "Access-Control-Allow-Origin": "*"}, body: JSON.stringify({id: 1, event: 'add', task: newtasking})}).then(ans=> ans.json()).then(realans=> console.log(realans))
        setTasks(old=>[...old, newtasking])
        setNewTasking("")
    }

    return (
        <div className='root'>
            <div class='admin'>
                <div class='tasking'>
                  {tasks.map(task=> <div class='intasking'><h3>{task}</h3><button onClick={() => deleteTasking(task)}>Удалить</button></div>)}
                </div>
                <div class='add-tasking'>
                    <input class='adminput' onChange={(e) => setNewTasking(e.target.value)} value={newtasking} type='text' />
                    <button onClick={() => addNewTasking()}>Добавить</button>
                </div>
            </div>
        </div>

    )
}
export default Admin;