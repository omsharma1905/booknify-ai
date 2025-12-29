import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Book } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";
import CreateBookModal from "../components/modals/CreateBookModal";
import BookCard from "../components/cards/BookCard";

// Skeleton Loader for Book Card
const BookCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-lg shadow-sm animate-pulse">
    <div className="w-full aspect-16/25 bg-slate-200 rounded-t-lg" />
    <div className="p-4">
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-slate-200 rounded w-1/2" />
    </div>
  </div>
);

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, isDeleting]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="min-h-screen px-4 flex justify-center items-center">
        <div
          onClick={!isDeleting ? onClose : undefined}
          className="bg-black/50 backdrop-blur-sm fixed inset-0"
        />

        <section className="max-w-md w-full bg-white rounded-xl p-6 shadow-xl relative">
          <h3 className="text-gray-900 text-lg font-semibold mb-4">
            {title}
          </h3>

          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="danger"
              onClick={onConfirm}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.BOOKS.GET_BOOKS
        );
        setBooks(response.data);
        localStorage.setItem("ebooksCount", response.data.length);
      } catch {
        toast.error("Failed to fetch your eBooks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    try {
      await axiosInstance.delete(
        `${API_PATHS.BOOKS.DELETE_BOOK}/${bookToDelete}`
      );

      setBooks(books.filter((book) => book._id !== bookToDelete));
      toast.success("Book removed successfully!");
    } finally {
      setBookToDelete(null);
    }
  };

  const handleCreateBookClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleBookCreated = (bookId) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${bookId}`);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg font-bold text-slate-900">All eBooks</h1>
            <p className="text-sm text-slate-600 mt-1">
              Create, edit, and manage all your AI-generated eBooks.
            </p>
          </div>

          <Button onClick={handleCreateBookClick} icon={Plus}>
            Create New eBook
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center py-16 border-2 border-dashed rounded-xl">
            <Book className="w-8 h-8 text-slate-400 mb-3" />
            <p className="text-slate-500 mb-4">
              No eBooks found.
            </p>
            <Button onClick={handleCreateBookClick} icon={Plus}>
              Create Your First Book
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={() => setBookToDelete(book._id)}
              />
            ))}
          </div>
        )}

        <ConfirmationModal
          isOpen={!!bookToDelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={handleDeleteBook}
          title="Delete eBook"
          message="Are you sure you want to delete this eBook?"
        />

        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onBookCreated={handleBookCreated}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;