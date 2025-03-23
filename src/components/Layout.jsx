import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tetris_T.svg/1280px-Tetris_T.svg.png"
                            alt="Tetris logo"
                            className="w-12 h-12"
                        />
                        <h1 className="text-2xl font-bold">Tetris Setups</h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex space-x-8 text-lg">
                        <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                            Home
                        </Link>
                        <Link to="/create" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                            Add Setup
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 max-w-6xl mx-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
