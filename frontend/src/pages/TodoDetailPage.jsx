import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const TodoDetailPage = () => {
  const [todo, setTodo] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await api.get(`/todos/${id}`);
        setTodo(res.data);
      } catch {
        toast.error("Failed to fetch the todo");
      }
    };
    fetchTodo();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await api.delete(`/todos/${id}`);
      toast.success("Todo deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  const handleSave = async () => {
    if (!todo.title.trim() || !todo.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    try {
      await api.put(`/todos/${id}`, todo);
      toast.success("Todo updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update todo");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Todos
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Todo
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Todo title"
                  className="input input-bordered"
                  value={todo.title}
                  onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your todo here..."
                  className="textarea textarea-bordered h-32"
                  value={todo.content}
                  onChange={(e) =>
                    setTodo({ ...todo, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;
