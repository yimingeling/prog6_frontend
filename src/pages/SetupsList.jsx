import React, { useState, useEffect } from 'react';
import { Link } from "react-router";

function SetupsList() {
    const [setups, setSetups] = useState(null);

    useEffect(() => {
        async function fetchSetups() {
            try {
                const response = await fetch('http://145.24.223.232:8000/setups', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                });

                const data = await response.json();
                setSetups(data.items);
            } catch (error) {
                console.error('Error fetching setups:', error);
            }
        }

        fetchSetups();
    }, []);

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://145.24.223.232:8000/setups/${id}`, {
                method: "DELETE",
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setSetups(prevSetups => prevSetups.filter(setup => setup.id !== id));
            } else {
                console.error("Failed to delete the setup.");
            }
            alert('deleting setup')

        } catch (error) {
            console.error("Error deleting setup:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Setups</h1>

            {!setups ? (
                <p className="text-center text-lg">Loading setups...</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {setups.map((setup) => (
                        <article
                            key={setup.id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                        >
                            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{setup.title}</h2>

                            {/* This pushes the button container to the bottom */}
                            <div className="mt-auto flex justify-between items-center pt-4">
                                <Link
                                    to={`/setups/${setup.id}`}
                                    className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                                >
                                    Details
                                </Link>

                                <Link
                                    to={`/setups/${setup.id}/edit`}
                                    className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(setup.id)}
                                    className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </article>

                    ))}
                </div>
            )}
        </div>
    );
}

export default SetupsList;
