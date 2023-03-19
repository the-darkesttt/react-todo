import { useState } from 'react';
import styles from './Todo.module.css';

export const Todo = () => {
    const [tasks, setTasks] = useState([{text:'Default', done:true}]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const taskText = event.target.task.value;
        const newTask = {
            text: taskText,
            done: false
        };
        if (taskText) {
            setTasks(tasks.concat(newTask));
            event.target.task.value = '';
        }
    };

    const handleTaskClick = ({target}) => {
        if (target.tagName !== 'LABEL') {
            const liId = target.closest('li').id;
            
            const newTasksArr = tasks.reduce((acc, currentValue, index) => {
                if (index == liId) {
                    currentValue.done = !currentValue.done;
                }
                acc.push(currentValue);
                return acc;
            }, []);
            setTasks(newTasksArr);
        }
    }

    const removeDone = () => {
        const filteredTasks = tasks.filter(task => !task.done);
        setTasks(filteredTasks);
    };

    return (
        <div className={styles.todo}>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Todo List</h1>
                    <span>Input your task:</span>
                    <div className={styles.taskInput}>
                        <input
                            type='text'
                            name='task'
                        />
                        <button type='submit'>Add Task</button>
                    </div>
                </form>
            </div>

            <ul>
                {tasks.map((task, index) => {
                    return (
                        <li 
                            id={index} 
                            key={index} 
                            onClick={handleTaskClick}
                        >
                            <label>
                                <input 
                                    checked={task.done ? true : false} 
                                    readOnly={true} 
                                    type='checkbox'
                                />
                                {task.text}
                            </label>
                        </li>
                    );
                })}
            </ul>

            <button 
                onClick={removeDone} 
                className={styles.removeTasks}
            >
                    Remove done tasks
            </button>
        </div>
    );
};
