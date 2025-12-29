import { Globe, BookOpen, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const socials = [
    {
        href: "/",
        ariaLabel: "Visit portfolio",
        icon: Globe,
    },
    {
        href: "https://github.com/omsharma1905",
        ariaLabel: "Visit GitHub",
        icon: Github,
    },
    {
        href: "https://www.linkedin.com/in/om-sharma1905/",
        ariaLabel: "Visit LinkedIn",
        icon: Linkedin,
    },
    {
        href: "/",
        ariaLabel: "Visit X",
        icon: Twitter,
    },
];

function Footer() {
    const { isAuthenticated } = useAuth();

    return (
        <footer className="relative bg-linear-to-br from-gray-950 via-gray-950 to-violet-950 text-white">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute top-0 right-0 size-96 bg-violet-500/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-14 lg:py-16">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-6">
                        <a
                            href="/"
                            className="inline-flex items-center gap-3 group w-fit"
                        >
                            <span className="size-9 sm:size-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/30 inline-flex items-center justify-center transition-all duration-300 group-hover:shadow-violet-500/50 group-hover:scale-105">
                                <BookOpen size={18} color="#ffffff" strokeWidth={2} />
                            </span>

                            <span className="text-lg sm:text-xl font-semibold tracking-tight">
                                Booknify AI
                            </span>
                        </a>

                        <p className="max-w-md text-gray-400 text-sm sm:text-base leading-relaxed">
                            Empowering storytellers to craft, design, and share their
                            narratives with the world — effortlessly.
                        </p>

                        {/* Social icons */}
                        <ul className="flex items-center gap-3 pt-2">
                            {/* eslint-disable-next-line no-unused-vars */}
                            {socials.map(({ href, ariaLabel, icon: Icon }, index) => (
                                <li key={index}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={ariaLabel}
                                        className="size-9 sm:size-10 rounded-lg bg-white/10 inline-flex items-center justify-center transition-all duration-200 hover:bg-violet-600 hover:scale-105"
                                    >
                                        <Icon size={18} color="#ffffff" strokeWidth={2} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <nav className="lg:justify-self-end">
                        <h3 className="text-sm font-semibold mb-4 text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 sm:space-y-4">
                            <li>
                                <Link
                                    to={isAuthenticated ? "/dashboard" : "/login"}
                                    className="text-sm text-gray-400 transition-colors hover:text-violet-400"
                                >
                                    Jump In
                                </Link>
                            </li>

                            <li>
                                <a
                                    href="#features"
                                    className="text-sm text-gray-400 transition-colors hover:text-violet-400"
                                >
                                    Features
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#testimonials"
                                    className="text-sm text-gray-400 transition-colors hover:text-violet-400"
                                >
                                    Testimonials
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                        © {new Date().getFullYear()} Booknify AI. All rights reserved.
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                        <span>Created with</span>
                        <span className="text-violet-400 text-base">💜</span>
                        <span>
                            by{" "}
                            <a
                                href="https://github.com/omsharma1905"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:underline"
                            >
                                @Om Sharma
                            </a>
                            , for creators
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;