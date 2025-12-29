import { useAuth } from "../../context/AuthContext";
import { ArrowRight, Book, BookOpen, Sparkles, WandSparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import HERO_IMG from "../../assets/hero-img.webp";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <article className="bg-linear-to-br from-violet-50 via-white to-purple-50 overflow-hidden relative">
      {/* Floating background elements */}
      <div className="size-64 bg-violet-200/30 backdrop-blur-3xl rounded-full absolute left-10 top-20 animate-pulse" />
      <div className="size-96 bg-purple-200/20 backdrop-blur-3xl rounded-full absolute right-10 bottom-20 animate-pulse delay-700" />

      <div className="max-w-7xl px-6 lg:px-8 py-16 sm:py-20 lg:py-32 mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Hero banner */}
          <div className="order-1 lg:order-2 lg:pl-8 relative">
            <div className="relative">
              <div className="bg-linear-to-r from-violet-600 to-purple-600 opacity-20 blur-2xl rounded-3xl absolute -inset-4" />

              <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden relative">
                <img
                  src={HERO_IMG}
                  alt="AI Ebook Creator Dashboard"
                  className="w-full h-auto select-none"
                />

                <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border border-gray-100 animate-in fade-in slide-in-from-right duration-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Processing</div>
                      <div className="text-sm font-semibold text-gray-900">
                        AI Generation
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border border-gray-100 animate-in fade-in slide-in-from-left duration-700 delay-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Completed</div>
                      <div className="text-sm font-semibold text-gray-900">
                        247 Pages
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block size-20 bg-violet-400/20 rounded-2xl absolute -left-8 -top-8 rotate-12" />
              <div className="hidden lg:block size-32 bg-purple-400/20 rounded-full absolute -right-6 -bottom-6" />
            </div>
          </div>

          {/* Content column */}
          <section className="order-2 lg:order-1 max-w-xl space-y-6 lg:space-y-8">
            <div className="bg-white/80 backdrop-blur-sm border border-violet-100 rounded-full px-4 py-2 shadow-sm inline-flex items-center gap-x-2 w-fit">
              <Sparkles className="size-4 text-violet-600" />
              <span className="text-violet-900 text-sm font-medium">
                AI-Powered Publishing
              </span>
            </div>

            <h1 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Create Stunning
              <br />
              <span className="text-purple-700">Ebooks in Minutes</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Write, design, and export professional eBooks in minutes. Your
              personal publishing assistant that handles the heavy lifting.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="bg-linear-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl px-8 py-4 shadow-lg shadow-violet-500/30 inline-flex items-center gap-x-2 transition-all duration-200 hover:shadow-violet-500/50 hover:scale-101 group w-full sm:w-auto justify-center"
              >
                <span>Start Creating for Free</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#demo"
                className="text-gray-700 font-medium inline-flex items-center gap-x-2 transition-colors duration-200 hover:text-violet-600 w-full sm:w-auto justify-center sm:justify-start"
              >
                <span>Watch Demo</span>
                <span className="text-violet-600">→</span>
              </a>
            </div>

            <div className="pt-6 lg:pt-8 flex flex-wrap items-center gap-6 lg:gap-8">
              <div>
                <p className="text-gray-900 text-xl sm:text-2xl font-bold">
                  50K+
                </p>
                <p className="text-gray-600 text-sm">Books Created</p>
              </div>

              <div className="h-12 w-px bg-gray-200 hidden sm:block" />

              <div>
                <p className="text-gray-900 text-xl sm:text-2xl font-bold">
                  4.9/5
                </p>
                <p className="text-gray-600 text-sm">User Rating</p>
              </div>

              <div className="h-12 w-px bg-gray-200 hidden sm:block" />

              <div>
                <p className="text-gray-900 text-xl sm:text-2xl font-bold">
                  10min
                </p>
                <p className="text-gray-600 text-sm">Avg. Creation</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default Hero;