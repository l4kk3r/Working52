import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [customtask, setCustomTask] = useState([])
    const [checkedTasks, setCheckedTasks] = useState([])
    const NEEDEDT = 52

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
        e.target.value = e.target.value.replace(/\n/g, "")
        e.target.value = e.target.value.replace(/ /g, "")
        e.target.value = e.target.value.replace(/&#32/g, "")
        e.target.value = e.target.value.replace(/&#160/g, "")
        e.target.value = e.target.value.replace(/&#8192/g, "")
        e.target.value = e.target.value.replace(/&#8194/g, "")
        e.target.value = e.target.value.replace(/&#8195/g, "")
        e.target.value = e.target.value.replace(/&#8196/g, "")
        e.target.value = e.target.value.replace(/&#8197/g, "")
        e.target.value = e.target.value.replace(/&#8198/g, "")
        e.target.value = e.target.value.replace(/&#8199/g, "")
        e.target.value = e.target.value.replace(/&#8193/g, "")
        e.target.value = e.target.value.replace(/&#8200/g, "")
        e.target.value = e.target.value.replace(/&#8201/g, "")
        e.target.value = e.target.value.replace(/&#8202/g, "")
        e.target.value = e.target.value.replace(/&#8232/g, "")
        e.target.value = e.target.value.replace(/&#8287/g, "")
        e.target.value = e.target.value.replace(/&#12288/g, "")
        setCustomTask(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 2 + "px"
        document.getElementById('txtarea').innerHTML = ""
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

    const sendTasks = () => {
        if (toast.isActive('toast')) {
            return 1;
        }
        if (checkedTasks.length < 52) {
            toast.warn(`Вам не хватает заданий. Вы выбрали ${checkedTasks.length} из 52`, {toastId: 'toast'})
        } else if (checkedTasks.length > 52) {
            toast.error(`Вы превысили допустимое количество выбранных заданий (52)`, {toastId: 'toast'})
        }
    }
    
    return (
        <div className='root'>
            <ToastContainer />
            <header>
                <img src='/logo.png' alt='logo' />
            </header>
            <div class='tasks-field'>
                <div class='leftside'>
                  <div class='inform'><img class='binfo' src='/binfo.svg' alt='delete-bin'/><p class='info-text'>Всего в баночку помещается 52 свертка с заданиями. Вы можете выбрать как наши варианты из списка ниже, так и добавить свои</p></div>
                  <h2>Всеww задания</h2>
                  <textarea maxLength={1000} id='txtarea' value={customtask} onChange={(e) => textareaListen(e)} onKeyPress={event => {
                    if (event.key === 'Enter') {
                        event.preventDefault()
                        addCustom()
                    }
                    }} placeholder='Cвоё задание'>
                    <button class='add-custom-b' onClick={() => addCustom()}>Добавить</button></textarea>
                  {tasks.map((task, i) => {return <div><input type='checkbox' checked={checkedTasks.includes(task) ? true : false} onChange={(e) => handleTask(e)} class='totask' id={i} name='alltasks' value={task} /><label class='choosen-task leftct' for={i}>{task}<img class='delete-bin' src='/badd.svg' alt='delete-bin'/></label></div>})}
                </div>
                <div class='rightside'>
                   <div style={{visibility: 'hidden'}} class='inform'><img class='binfo' src='/binfo.svg' alt='delete-bin'/><p class='info-text'>Всего в баночку помещается 52 свертка с заданиями. Вы можете выбрать как наши варианты из списка ниже, так и добавить свои</p></div>
                   <h2>Выбранные задания</h2>
                   {checkedTasks.map((task, i) => {return <div onClick={() => deleteTask(task)} class='choosen-task leftct'><h3>{task}</h3><img class='delete-bin' src='/bdelete.svg' alt='delete-bin'/></div>})}
                   <div class='conwrapper'><button onClick={() => sendTasks()} style={{cursor: ''}} class='confirm-button'>Подтвердить</button></div>
                </div>
                <div class='rightside-mobile'>
                    <button id='openCart' onClick={() => openCart()} class='open-cart'>Открыть</button>
                    <button onClick={() => sendTasks()} class='open-cart mob-send'>Отправить</button>
                    <div id='theCart' style={{display: 'none'}} class='mobctask'><div class='cart-content'><button style={{display: 'none'}} id='closeCart' class='close-cart' onClick={() => closeCart()}>Скрыть</button>{checkedTasks.map((task, i) => {return <div style={{borderRadius: (i == checkedTasks.length - 1) ? '10px' : '0px'}} class='inmobctask'><h3>{task}</h3><button class='mob-rb' onClick={() => deleteTask(task)}>Удалить</button></div>})}<div class='conwrapper'></div></div></div>
                
                </div>
                <div class='counter' style={{color: checkedTasks.length === NEEDEDT ? '#0CDC46' : checkedTasks.length < NEEDEDT ? '#FFD662' : '#C41E3A' }}><span class={checkedTasks.length > NEEDEDT ? 'blink' : ''}>{checkedTasks.length}</span></div>
            </div>
        </div>

    )
}
export default Home;
