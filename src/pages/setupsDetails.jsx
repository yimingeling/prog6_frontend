import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function SetupsDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await fetch(`http://145.24.223.232:8000/setups/${id}`, {
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) {
                    navigate('/404'); // Redirect to 404 if the setup is not found
                    return;
                }

                const data = await response.json();
                setDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, [id, navigate]);

    async function handleDelete() {
        try {
            const response = await fetch(`http://145.24.223.232:8000/setups/${id}`, {
                method: "DELETE",
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Failed to delete the Setup.");
            }

            navigate("/setups"); // Redirect to setups list after deletion
        } catch (error) {
            setDeleteError(error.message);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-xl w-full">
                <img
                    src="https://plein8.com/wp-content/uploads/2024/09/placeholder-2-1.png"
                    alt={details.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{details.title}</h1>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{details.body}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4"><strong>Author:</strong> {details.author}</p>

                    {deleteError && <p className="text-red-500 mt-3">{deleteError}</p>}

                    <button
                        onClick={handleDelete}
                        className="mt-6 w-full bg-red-500 dark:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition"
                    >
                        Delete Setup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SetupsDetails;
