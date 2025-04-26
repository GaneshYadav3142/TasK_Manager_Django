import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, exportTasks } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskList from './TaskList';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!username || !token) {
      navigate('/login'); 
    } else {
      fetchTasks();
    }
  }, [username]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(username);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleCreateOrUpdate = async (taskData) => {
    
    try {
      if (editingTask) {
        await updateTask(editingTask.id, {...taskData,username});
      } else {
        await createTask({ ...taskData, username });
      }
      fetchTasks();
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error creating/updating task', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleExportTasks = async () => {
    try {
      const response = await exportTasks(username);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `tasks_${username}.xlsx`); // or .csv if your server sends CSV
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting tasks', error);
    }
  };
  
  return (
    <div className="container mx-auto p-8 space-y-8 relative bg-gradient-to-r from-blue-500 to-indigo-600 h-screen">
        <button
                  onClick={() => navigate('/')}
                  className="text-xl text-white hover:text-slate  top-4 left-4 absolute"
                >
                  <FaArrowLeft  size={30}/>
                </button>
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Tasks for {username} <span className="text-sm text-gray-600">({tasks?.length} task{tasks?.length !== 1 ? 's' : ''})</span>
      </h1>
      <div className="flex gap-4">
    <button
      onClick={handleExportTasks}
      className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
    >
     <FiDownload  style={{textAlign:'center'}}/>
    </button>
    <button
      onClick={handleAddTask}
      className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
    >
      Add Task
    </button>
  </div>

    </div>
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />

      {showForm && (
        <TaskForm
          editingTask={editingTask}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
