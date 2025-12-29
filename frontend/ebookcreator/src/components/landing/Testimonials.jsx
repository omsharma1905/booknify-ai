import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../../utils/data";

const stats = [
    { value: "50K+", label: "Happy Users" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "100K+", label: "eBooks Created" },
];

const Testimonials = () => (
    <article
        id="testimonials"
        className="relative overflow-hidden bg-linear-to-br from-violet-50 via-purple-50 to-white py-16 sm:py-20 lg:py-32"
    >
        {/* Background effects */}
        {/* Local continuation glow (content-width only) */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3xl max-w-[90%] h-24 bg-linear-to-b from-violet-200/50 to-transparent blur-2xl" />
        <div className="size-64 bg-violet-200/30 backdrop-blur-3xl rounded-full absolute top-20 right-10 animate-pulse" />
        <div className="size-96 bg-purple-200/20 backdrop-blur-3xl rounded-full absolute bottom-20 left-10 animate-pulse delay-700" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            {/* Header */}
            <header className="text-center space-y-4 mb-14 sm:mb-20">
                <div className="bg-white border border-violet-100 rounded-full px-4 py-2 inline-flex items-center gap-2 mx-auto shadow-sm">
                    <Star className="size-4 text-violet-600 fill-violet-600" />
                    <span className="text-violet-900 text-sm font-semibold">
                        Testimonials
                    </span>
                </div>

                <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                    Writers Rave About
                    <br />
                    <span className="text-violet-600">Their Success Stories</span>
                </h2>

                <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                    Don't just take our word for it. Here's what our users have to say about their experience.
                </p>
            </header>

            {/* Testimonials grid */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.map(({ author, title, quote, avatar, rating }) => (
                    <li
                        key={author}
                        className="relative bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xl transition-transform duration-300 hover:-translate-y-2"
                    >
                        {/* Quote icon */}
                        <div className="absolute -top-5 sm:-top-6 left-6 size-9 sm:size-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Quote className="size-5 text-white" />
                        </div>

                        {/* Rating */}
                        <div className="mb-4 sm:mb-5 flex items-center gap-1">
                            {Array(rating)
                                .fill(1)
                                .map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-4 sm:size-5 text-violet-600 fill-violet-600"
                                    />
                                ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                            "{quote}"
                        </blockquote>

                        {/* Author */}
                        <footer className="flex items-center gap-3">
                            <img
                                src={avatar}
                                alt={author}
                                className="size-11 sm:size-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-gray-900 font-semibold text-sm">
                                    {author}
                                </p>
                                <p className="text-gray-500 text-xs sm:text-sm">
                                    {title}
                                </p>
                            </div>
                        </footer>
                    </li>
                ))}
            </ul>

            {/* Stats */}
            <ul className="max-w-4xl mx-auto mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {stats.map(({ value, label }, index) => (
                    <li key={label} className="text-center">
                        <p className="text-gray-900 text-3xl sm:text-4xl font-extrabold mb-2">
                            {value}
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {label}
                        </p>

                        {index !== stats.length - 1 && (
                            <div className="sm:hidden w-16 h-px bg-gray-200 mx-auto mt-6" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </article >
);

export default Testimonials;