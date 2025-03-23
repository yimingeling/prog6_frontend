import { Link, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

function SetupsEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errors, setErrors] = useState({});


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
                    return;
                }

                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching Setup:", error);
            }
        }

        fetchDetails();
    }, [id]);


    const validateForm = () => {
        let validationErrors = {};
        if (!formData.title.trim()) validationErrors.title = "Title is required.";
        if (!formData.body.trim()) validationErrors.body = "Body is required.";
        if (!formData.author.trim()) validationErrors.author = "Author is required.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }



    async function handleSubmit(event) {
        event.preventDefault();
        setSuccessMessage(null);

        if (!validateForm()) return;


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
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Edit Setup</h1>

                {successMessage && (
                    <div className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 p-3 rounded-md mb-4">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

                    </div>

                    <div>
                        <label htmlFor="body" className="block text-gray-700 dark:text-gray-300 font-medium">Body:</label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}

                    </div>

                    <div>
                        <label htmlFor="author" className="block text-gray-700 dark:text-gray-300 font-medium">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}

                    </div>



                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 dark:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>

                        <Link
                            to={`/setups/`}
                            className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition"
                        >
                            Go Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SetupsEdit;
