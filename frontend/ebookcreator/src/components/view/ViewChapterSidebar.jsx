import { BookOpen, ChevronLeft } from "lucide-react";

const ViewChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  isOpen,
  onClose,
}) => {
  
  return <>
    {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative left-0 top-0 h-full w-80 bg-white border-r border-e-gray-100 transform transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="border-b border-gray-100 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-violet-600" />
              <span className="text-gray-900 font-medium">Chapters</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-1 transition-colors duration-150 hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="h-full pb-20 overflow-y-auto">
          {book.chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelectChapter(index);
                  onClose();
                }}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 
                ${selectedChapterIndex === index ? "bg-violet-50 border-l-4 border-l-violet-600" : ""
                }`}
              >
                <div
                  className={`text-sm font-medium truncate ${
                    selectedChapterIndex === index
                      ? "text-violet-900"
                      : "text-gray-900"
                  }`}
                >
                  {chapter.title}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  Chapter {index + 1}
                </div>
              </button>
          ))}
        </div>
      </div>
  </>
};

export default ViewChapterSidebar;