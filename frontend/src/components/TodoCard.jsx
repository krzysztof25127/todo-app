import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const TodoCard = ({ todo, setTodos }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await api.delete(`/todos/${todo._id}`);
      setTodos((prev) => prev.filter((t) => t._id !== todo._id));
      toast.success("Todo deleted successfully");
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  const handleToggleDone = async (e) => {
    e.stopPropagation();
    try {
      const updatedTodo = { ...todo, isDone: !todo.isDone };
      await api.put(`/todos/${todo._id}`, updatedTodo);
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? updatedTodo : t))
      );
      toast.success(`Marked as ${updatedTodo.isDone ? "done" : "not done"}`);
    } catch {
      toast.error("Failed to update todo status");
    }
  };

  const borderClass = todo.isDone ? "border-red-500" : "border-green-500";

  return (
    <Link
      to={`/todo/${todo._id}`}
      className={`card bg-base-100 hover:shadow-lg transition duration-200 border-t-4 border-solid ${borderClass}`}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="card-title">{todo.title}</h3>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={todo.isDone}
              onClick={handleToggleDone}
              className="checkbox checkbox-success"
            />
            <span className="text-xs">{todo.isDone ? "Done" : "To do"}</span>
          </label>
        </div>
        <p className="text-base-content/70 line-clamp-3">{todo.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(todo.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TodoCard;
