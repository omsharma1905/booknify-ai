import { useEffect, useRef, useState } from "react";
import {
    Plus,
    Sparkles,
    Trash2,
    ArrowLeft,
    BookOpen,
    Hash,
    Lightbulb,
    Palette,
} from "lucide-react";

import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";

import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
    const { user } = useAuth();

    const [step, setStep] = useState(1);
    const [bookTitle, setBookTitle] = useState("");
    const [numChapters, setNumChapters] = useState(5);
    const [aiTopic, setAiTopic] = useState("");
    const [aiStyle, setAiStyle] = useState("");
    const [chapters, setChapters] = useState([]);
    const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
    const [isFinalisingBook, setIsFinalisingBook] = useState(false);

    const chaptersContainerRef = useRef(null);

    const resetModal = () => {
        setStep(1);
        setBookTitle("");
        setNumChapters(5);
        setAiTopic("");
        setAiStyle("Informative");
        setChapters([]);
        setIsGeneratingOutline(false);
        setIsFinalisingBook(false);
    };

    const handleGenerateOutline = async () => {
        if (!bookTitle || !numChapters) {
            toast.error("Please provide a book title and number of chapters.");
            return;
        }

        setIsGeneratingOutline(true);
        try {
            const response = await axiosInstance.post(
                API_PATHS.AI.GENERATE_OUTLINE,
                {
                    topic: bookTitle,
                    description: aiTopic || "",
                    style: aiStyle,
                    numChapters: numChapters,
                }
            );

            setChapters(response.data.outline);
            setStep(2);
            toast.success("Outline generated! Review and edit chapters.");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to generate outline."
            );
        } finally {
            setIsGeneratingOutline(false);
        }
    };

    const handleChapterChange = (index, field, value) => {
        const updatedChapters = [...chapters];
        updatedChapters[index][field] = value;
        setChapters(updatedChapters);
    };

    const handleDeleteChapter = (index) => {
        if (chapters.length <= 1) return;
        setChapters(chapters.filter((_, i) => i !== index));
    };

    const handleAddChapter = () => {
        setChapters([
            ...chapters,
            { title: `chapter ${chapters.length + 1}`, description: "" },
        ]);
    };

    const handleFinalizeBook = async () => {
        if (isFinalisingBook) return;

        if (!bookTitle || chapters.length === 0) {
            toast.error("Book title and at least one chapter is required!");
            return;
        }

        setIsFinalisingBook(true);
        try {
            const { data } = await axiosInstance.post(
                API_PATHS.BOOKS.CREATE_BOOK,
                {
                    title: bookTitle,
                    author: user?.name || "Unknown Author",
                    chapters,
                }
            );

            toast.success("eBook created successfully!");
            onBookCreated(data._id);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to create eBook."
            );
        } finally {
            setIsFinalisingBook(false);
        }
    };

    useEffect(() => {
        if (step === 2 && chaptersContainerRef.current) {
            const scrollableDiv = chaptersContainerRef.current;
            scrollableDiv.scrollTo({
                top: scrollableDiv.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chapters.length, step]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                resetModal();
            }}
            title="Create New eBook"
        >
            {step === 1 && (
                <div className="space-y-5">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-sm font-semibold">
                            1
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-200" />
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 text-sm font-semibold">
                            2
                        </div>
                    </div>

                    <InputField
                        icon={BookOpen}
                        label="Book Title"
                        placeholder="What should we call your eBook?"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                    />

                    <InputField
                        icon={Hash}
                        label="Number of Chapters"
                        type="number"
                        value={numChapters}
                        onChange={(e) =>
                            setNumChapters(parseInt(e.target.value) || 1)
                        }
                        min="1"
                        max="20"
                    />

                    <InputField
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        icon={Lightbulb}
                        label="Topic (Optional)"
                        placeholder="Specific topic for AI generation..."
                    />

                    <SelectField
                        icon={Palette}
                        label="Writing Style"
                        value={aiStyle}
                        onChange={(e) => setAiStyle(e.target.value)}
                        options={[
                            "Informative",
                            "Storytelling",
                            "Casual",
                            "Professional",
                            "Humorous",
                        ]}
                    />

                    <div className="flex justify-end pt-4">
                        <Button
                            type="button"
                            onClick={handleGenerateOutline}
                            isLoading={isGeneratingOutline}
                            icon={Sparkles}
                        >
                            Generate Outline with AI
                        </Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-5">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-sm font-semibold">
                            ✓
                        </div>
                        <div className="flex-1 h-0.5 bg-violet-600" />
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-sm font-semibold">
                            2
                        </div>
                    </div>

                    <section className="flex justify-between items-center mb-4">
                        <h3 className="text-gray-900 text-lg font-semibold">
                            Review Chapters
                        </h3>
                        <span className="text-gray-500 text-sm">
                            {chapters.length} chapters
                        </span>
                    </section>

                    <div
                        ref={chaptersContainerRef}
                        className="space-y-3 max-h-96 overflow-y-auto pr-1"
                    >
                        {chapters.map((chapter, index) => (
                            <div
                                key={index}
                                className="group p-4 border border-gray-200 rounded-xl bg-white"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold shrink-0 mt-2">
                                        {index + 1}
                                    </div>

                                    <input
                                        type="text"
                                        value={chapter.title}
                                        onChange={(e) =>
                                            handleChapterChange(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 bg-transparent border-none focus:outline-none"
                                    />

                                    <button
                                        onClick={() =>
                                            handleDeleteChapter(index)
                                        }
                                        className="opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>

                                <textarea
                                    value={chapter.description}
                                    onChange={(e) =>
                                        handleChapterChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    rows={2}
                                    className="w-full bg-transparent border-none focus:outline-none resize-none"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                            variant="ghost"
                            onClick={() => setStep(1)}
                            icon={ArrowLeft}
                        >
                            Back
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleAddChapter}
                                icon={Plus}
                            >
                                Add Chapter
                            </Button>

                            <Button
                                type="button"
                                onClick={handleFinalizeBook}
                                isLoading={isFinalisingBook}
                            >
                                Create eBook
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CreateBookModal;