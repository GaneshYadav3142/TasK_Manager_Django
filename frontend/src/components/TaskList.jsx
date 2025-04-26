import { FaEdit, FaTrash } from 'react-icons/fa';

export default function TaskList({ tasks, onDelete, onEdit }) {
  if (!tasks.length) {
    return <p className="text-center text-gray-500">No tasks found.</p>;
  }

  return (
    <div className="grid gap-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out bg-white flex justify-between items-center"
        >
          <div className="w-full">
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <div className="text-sm text-gray-500 mt-3">
              <p>Effort: {task.effort} day(s)</p>
              <p>Due: {task.due_date}</p>
            </div>
          </div>
          <div className="flex gap-6">
            {/* Edit Button */}
            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 hover:text-blue-800 transition-all duration-300"
              title="Edit"
            >
              <FaEdit size={22} />
            </button>
            {/* Delete Button */}
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800 transition-all duration-300"
              title="Delete"
            >
              <FaTrash size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
