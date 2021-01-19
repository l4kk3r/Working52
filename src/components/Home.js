import React, {useEffect, useState} from 'react'

import './styles.css'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [customtask, setCustomTask] = useState([])
    const [checkedTasks, setCheckedTasks] = useState([])
    const NEEDEDT = 2

    useEffect(()=>{
        fetch('https://tasks52.herokuapp.com/all-tasks',{method: "get", headers: {"mode":"no-cors", "Access-Control-Allow-Origin": "*"}}).then(ans=> ans.json()).then(realans=> setTasks(realans.tasks))
    }, [])

    const handleTask = (e) => {
        if (e.target.checked) {
            setCheckedTasks(old=>[...old, e.target.value])
            setTasks(tasks.filter(item => item !==  e.target.value))
        } else {
            deleteTask(e.target.value)
        }
    }

    const deleteTask = (neededtask) => {
        setCheckedTasks(checkedTasks.filter(item => item !== neededtask))
        setTasks(old => [...old, neededtask])
    }

    const addCustom = () => {
        setCheckedTasks(old=>[...old, customtask])
        setCustomTask("")
    }
    
    const textareaListen = (e) => {
        setCustomTask(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 2 + "px"
    }

    const openCart = () => {
        document.getElementById('openCart').style.display = 'none'
        document.getElementById('theCart').style.display = 'block'
        document.getElementById('closeCart').style.display = 'block'
    }

    const closeCart = () => {
        document.getElementById('openCart').style.display = 'block'
        document.getElementById('theCart').style.display = 'none'
        document.getElementById('closeCart').style.display = 'none'
    }

    return (
        <div className='root'>
            <div class='tasks-field'>
                <div class='leftside'>
                  {tasks.map((task, i) => {return <div><input type='checkbox' checked={checkedTasks.includes(task) ? true : false} onChange={(e) => handleTask(e)} class='totask' id={i} name='alltasks' value={task} /><label class='choosen-task leftct' for={i}>{task}</label></div>})}
                  <textarea value={customtask} onChange={(e) => textareaListen(e)} onKeyPress={event => {
                    if (event.key === 'Enter') {
                        addCustom()
                    }
                    }} placeholder='Cвоё задание'>
                    <button class='add-custom-b' onClick={() => addCustom()}>Добавить</button></textarea>
                </div>
                <div class='rightside'>
                   {checkedTasks.map((task, i) => {return <div class='choosen-task'><h3>{task}</h3><img class='delete-bin' src='/delete.png' onClick={() => deleteTask(task)} alt='delete-bin'/></div>})}
                   <div class='conwrapper'><button onClick={() => console.log('hhh')} disabled={checkedTasks.length === NEEDEDT ? false : true} class='confirm-button'>Подтвердить</button></div>
                </div>
                <div class='rightside-mobile'>
                    <button id='openCart' onClick={() => openCart()} class='open-cart'>Открыть</button>
                    <div id='theCart' style={{display: 'none'}} class='mobctask'><div class='cart-content'><button style={{display: 'none'}} id='closeCart' onClick={() => closeCart()}>Скрыть</button>{checkedTasks.map((task, i) => {return <div class='inmobctask'><h3>{task}</h3><button class='mob-rb' onClick={() => deleteTask(task)}>Удалить</button></div>})}</div></div>
                </div>
                <div class='counter' style={{color: checkedTasks.length == NEEDEDT ? '#0CDC46' : checkedTasks.length < NEEDEDT ? '#FFD662' : '#C41E3A' }}>{checkedTasks.length}</div>
            </div>
        </div>

    )
}
export default Home;