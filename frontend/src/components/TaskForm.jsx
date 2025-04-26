import { useState, useEffect } from 'react';

export default function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [effort, setEffort] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setEffort(editingTask.effort || '');
      setDueDate(editingTask.due_date || '');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, effort, due_date: dueDate });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">{editingTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Effort (Days)"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={effort}
              onChange={(e) => setEffort(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              style={{
              
                    width: '100%',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '1.125rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    backgroundColor: 'white',
                  }}
            
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 w-full md:w-auto rounded-lg bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 w-full md:w-auto rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {editingTask ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
