import { useMemo, useState } from "react";
import { Sparkles, Type, Eye, Maximize2 } from "lucide-react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import SimpleMDEditor from "./SimpleMDEditor";

const ChapterEditorTab = ({
  book = {
    title: "Untitled",
    chapters: [
      {
        title: "Chapter 1",
        content: "-",
      },
    ],
  },
  selectedChapterIndex = 0,
  onChapterChange = () => { },
  onGenerateChapterContent = () => { },
  isGenerating,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simple markdown parser
  const formatMarkdown = (content) => {
    return content
      .replace(/^### (.*$)/gm, "<h3 class='text-xl font-bold mt-6 mb-4'>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2 class='text-2xl font-bold mt-8 mb-4'>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1 class='text-3xl font-bold mt-8 mb-6'>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>")
      .replace(/^> (.*$)/gm, "<blockquote class='border-l-4 border-violet-500 italic pl-4 my-4'>$1</blockquote>")
      // eslint-disable-next-line no-useless-escape
      .replace(/^\- (.*$)/gm, "<li class='ml-4 mb-1'>$1</li>")
      .replace(/(<li.*<\/li>)/gs, "<ul class='my-4'>$1</ul>")
      .replace(/^\d+\. (.*$)/gm, "<li class='ml-4 mb-1 list-decimal'>$1</li>")
      .replace(/(<li class='ml-4 mb-1 list-decimal'>.*<\/li>)/gs, "<ol class='my-4 ml-4'>$1</ol>")
      .split("\n\n")
      .map((p) => {
        const paragraph = p.trim();
        if (!paragraph) return "";
        if (paragraph.startsWith("<")) return paragraph;
        return `<p class="mb-4 text-justify">${paragraph}</p>`;
      })
      .join("");
  };

  const mdeOptions = useMemo(
    () => ({
      autofocus: true,
      spellChecker: false,
    }),
    []
  );

  if (
    selectedChapterIndex === null ||
    !book.chapters[selectedChapterIndex]
  ) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex justify-center items-center mx-auto mb-4">
            <Type className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            Select a chapter to start editing
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Choose from the sidebar to begin writing
          </p>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters[selectedChapterIndex];

  return (
    <article
      className={`${isFullscreen ? "bg-white fixed inset-0 z-50" : "flex-1"
        } flex flex-col`}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Chapter Editor
              </h1>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Editing:{" "}
                {currentChapter.title ||
                  `Chapter ${selectedChapterIndex + 1}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(false)}
                  className={`text-sm font-medium px-3 py-2 ${!isPreviewMode
                    ? "bg-violet-50 text-violet-700 border-r border-violet-200"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(true)}
                  className={`text-sm font-medium px-3 py-2 ${isPreviewMode
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  Preview
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <Button
                type="button"
                onClick={() => onGenerateChapterContent(selectedChapterIndex)}
                isLoading={isGenerating === selectedChapterIndex}
                icon={Sparkles}
                size="sm"
              >
                Generate with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full bg-white px-8 py-6 flex flex-col">
          <div className="h-full bg-white">
            <div className="space-y-6 h-full flex flex-col">
              {/* Chapter Title */}
              <div>
                <InputField
                  label="Chapter Title"
                  name="title"
                  value={currentChapter.title || ""}
                  onChange={onChapterChange}
                  placeholder="Enter chapter title..."
                  className="text-xl font-semibold"
                />
              </div>

              {/* Editor/ Preview Area */}
              <div className="flex-1 min-h-0 mt-6">
                {isPreviewMode ? (
                  <div className="h-full border border-gray-200 rounded-lg overflow-y-auto">
                    <div className="bg-slate-50 border-b border-gray-200 px-4 py-3">
                      <div className="text-gray-600 text-sm flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>Preview Mode</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h1 className="text-3xl font-bold mb-6 text-gray-900">
                        {currentChapter.title || "Untitled Chapter"}
                      </h1>
                      <div
                        className="formatted-content"
                        style={{
                          fontFamily:
                            'Charter, Georgia, "Times New Roman", serif',
                          lineHeight: 1.7,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: currentChapter.content
                            ? formatMarkdown(currentChapter.content)
                            : "<p class='text-gray-400 italic'>No content yet.</p>",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <SimpleMDEditor
                    value={currentChapter.content || ""}
                    onChange={(value) =>
                      onChapterChange({
                        target: { name: "content", value },
                      })
                    }
                    options={mdeOptions}
                  />
                )}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-4">
                  <span>
                    Words: {currentChapter.content ? currentChapter.content.split(/\s+/).filter(word => word.length > 0).length : 0}
                  </span>
                  <span>
                    Characters: {currentChapter.content ? currentChapter.content.length : 0}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Auto-saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ChapterEditorTab;