import { Link, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

function SetupsEdit() {
    const navigate = useNavigate(); // Hook for redirection

    const params = useParams();
    const id = params.id;
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        author: '',
    });
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await fetch(`http://145.24.223.232:8000/setups/${id}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) {
                    navigate('/404');
                }

                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching Setup:", error);
            }
        }

        fetchDetails();
    }, [id]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setSuccessMessage(null);

        try {
            const response = await fetch(`http://145.24.223.232:8000/setups/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 400) {
                console.error("Invalid input. Please check all fields.");
                return;
            }

            if (response.status === 404) {
                console.error("Setup not found.");
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccessMessage("Setup successfully updated! 🎉");

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center m-3">Edit Setup</h1>

            {successMessage && (
                <div className="max-w-md mx-auto p-4 mb-4 bg-green-100 text-green-700 border border-green-400 rounded">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 rounded shadow-md mt-10 space-y-4">

                <div>
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Titel:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="body" className="block text-gray-700 font-medium mb-2">Beschrijving:</label>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author:</label>
                    <textarea
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    ></textarea>
                </div>

                <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
                    Save Changes
                </button>

                <Link
                    to={`/setups/`}
                    className="inline-block text-center w-full px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition mt-2"
                >
                    Go Back
                </Link>
            </form>
        </>
    );
}

export default SetupsEdit;
