import { Link } from 'react-router';

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 text-center p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <h1 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    Welcome to my Modern Tetris Setup Collection!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 p-10">
                    Explore various Tetris setups, add your own, or manage existing setups.
                </p>
                <div className="space-x-4">
                    <Link
                        to="/setups"
                        className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                    >
                        View Setups
                    </Link>
                    <Link
                        to="/create"
                        className="px-6 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition"
                    >
                        Add Setup
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
