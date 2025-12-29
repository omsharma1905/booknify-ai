import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import ViewChapterSideBar from "./ViewChapterSidebar";

const ViewBook = ({ book }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const selectedChapter = book.chapters[selectedChapterIndex];

  // Format content with proper paragraphs and styling
  const formatContent = (content) => {
    return content
      .split('\n\n')
      .filter(paragraph => paragraph.trim())
      .map(paragraph => paragraph.trim())
      .map(paragraph => {
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        paragraph = paragraph.replace(/(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g, '<em>$1</em>');
        return `<p>${paragraph}</p>`;
      })
      .join('');
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white text-gray-900">
      <ViewChapterSideBar
        book={book}
        selectedChapterIndex={selectedChapterIndex}
        onSelectChapter={setSelectedChapterIndex}
        isOpen={SidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base md:text-lg font-semibold truncate">{book.title}</h1>
              <p className="text-gray-500 text-sm">by {book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font side controls */}
            <div className="mr-4 flex items-center gap-2">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="font-bold text-sm rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                A-
              </button>
              <span className="text-gray-500 text-sm">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="font-bold text-lg rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                A+
              </button>
            </div>
          </div>
        </header>

        {/* Reading area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl px-6 py-12 mx-auto">
            {/* Chapter Title */}
            <h1 className="text-xl md:text-3xl font-bold mb-8 leading-tight">
              {selectedChapter.title}
            </h1>

            {/* Chapter Content */}
            <div
              className="reading-content"
              style={{
                fontFamily: "Charter, Georgia, 'Times New Roman', serif",
                fontSize: `${fontSize}px`,
                lineHeight: 1.7,
              }}
              dangerouslySetInnerHTML={{
                __html: formatContent(selectedChapter.content),
              }}
            />

            {/* Navigation */}
            <div className="border-t border-gray-200 pt-8 mt-16 flex justify-between items-center">
              <button
                onClick={() =>
                  setSelectedChapterIndex(Math.max(0, selectedChapterIndex - 1))
                }
                disabled={selectedChapterIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <span className="text-gray-500 text-sm">
                {selectedChapterIndex + 1} of {book.chapters.length}
              </span>

              <button
                onClick={() =>
                  setSelectedChapterIndex(
                    Math.min(book.chapters.length - 1, selectedChapterIndex + 1)
                  )
                }
                disabled={selectedChapterIndex === book.chapters.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .reading-content p {
          margin-bottom: 1.5em;
          text-align: justify;
          hyphens: auto;
        }

        .reading-content p:first-child {
          margin-top: 0;
        }

        .reading-content p:last-child {
          margin-bottom: 0;
        }

        .reading-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .reading-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  )
}

export default ViewBook;