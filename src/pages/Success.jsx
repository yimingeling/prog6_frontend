import { Link } from "react-router";

function Success() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 animate-fade-in">
                    ✅ Setup added successfully!
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your setup has been saved. You can now view or edit it.
                </p>

                <Link
                    to="/setups"
                    className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                >
                    Go to Setups
                </Link>
            </div>
        </div>
    );
}

export default Success;
