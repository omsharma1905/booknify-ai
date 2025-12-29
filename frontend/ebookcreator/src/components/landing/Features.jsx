import { useAuth } from "../../context/AuthContext";
import { FEATURES } from "../../utils/data";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

function Features() {
    const { isAuthenticated } = useAuth();

    return (
        <article
            id="features"
            className="bg-linear-to-br from-violet-50 via-white to-purple-50 py-16 sm:py-20 lg:py-32 overflow-hidden relative"
        >
            {/* Mid-left accent beside heading */}
            <div className="pointer-events-none absolute top-[38%] left-[12%] -translate-y-1/2">
                <div className="size-56 bg-violet-400/35 rounded-full blur-[120px]" />
                <div className="absolute -top-16 -left-12 size-40 bg-purple-400/30 rounded-full blur-[100px]" />
                <div className="absolute top-24 left-16 size-32 bg-fuchsia-400/25 rounded-full blur-[90px]" />
            </div>

            {/* Supporting background accents (right + bottom only) */}
            <div className="pointer-events-none absolute top-1/4 -right-32 size-128 bg-purple-400/30 rounded-full blur-[150px]" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 size-120 bg-violet-400/25 rounded-full blur-[140px]" />

            <div className="max-w-7xl px-6 lg:px-8 mx-auto relative">
                <header className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 lg:mb-20">
                    <div className="bg-violet-300/90 rounded-full px-4 py-2 inline-flex items-center gap-x-2 w-fit mx-auto shadow-lg shadow-violet-500/30">
                        <span className="size-2 bg-violet-700 rounded-full animate-pulse" />
                        <span className="text-violet-950 text-sm font-semibold">
                            Features
                        </span>
                    </div>

                    <h2 className="text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight px-4">
                        Everything You Need to
                        <br />
                        <span className="bg-linear-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                            Create Your Ebook
                        </span>
                    </h2>

                    <p className="max-w-2xl text-gray-700 text-sm sm:text-base leading-relaxed mx-auto px-4">
                        From blank page to bestseller—everything you need is built right in,
                        ready when inspiration strikes.
                    </p>
                </header>

                {/* Grid wrapper with focused glow */}
                <div className="relative">
                    <div className="absolute inset-0 -z-10 bg-radial-gradient from-violet-300/40 via-transparent to-transparent blur-2xl" />

                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
                        {/* eslint-disable-next-line no-unused-vars */}
                        {FEATURES.map(({ title, icon: FeatIcon, description, gradient }) => (
                            <li
                                key={title}
                                className="bg-white/85 backdrop-blur-md border border-violet-200/60 rounded-2xl p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2 relative group"
                            >
                                <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl bg-linear-to-br from-violet-100/0 to-purple-100/0 transition-all duration-300 group-hover:from-violet-100/60 group-hover:to-purple-100/60" />

                                <section className="relative z-10 space-y-4">
                                    <div
                                        className={`size-14 bg-linear-to-br ${gradient} rounded-xl shadow-xl shadow-black/20 flex justify-center items-center transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <FeatIcon className="size-7 text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-gray-900 text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-violet-900">
                                            {title}
                                        </h3>

                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {description}
                                        </p>
                                    </div>

                                    <Link
                                        to={isAuthenticated ? "/dashboard" : "/login"}
                                        className="text-violet-700 pt-2 opacity-0 inline-flex items-center gap-x-px transition-opacity duration-300 group-hover:opacity-100"
                                    >
                                        <span className="text-sm font-semibold">Learn more</span>
                                        <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </section>
                            </li>
                        ))}
                    </ul>
                </div>

                <footer className="text-center mt-14 sm:mt-16 lg:mt-20">
                    <p className="text-gray-700 text-sm sm:text-base mb-6">
                        Ready to bring your book to life?
                    </p>

                    <Link
                        to={isAuthenticated ? "/dashboard" : "/login"}
                        className="bg-linear-to-r from-violet-700 to-purple-700 text-white text-sm sm:text-base font-semibold rounded-xl px-8 py-4 shadow-xl shadow-violet-600/40 inline-flex items-center gap-x-2 transition-all duration-200 hover:shadow-violet-600/60 hover:scale-105 group"
                    >
                        <span>
                            {isAuthenticated ? "My Writing Space" : "Launch Your First Book"}
                        </span>
                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </footer>
            </div>
        </article>
    );
}

export default Features;