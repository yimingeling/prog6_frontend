import { useState } from "react";
import { useNavigate } from "react-router";

function SetupsCreate() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        author: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let validationErrors = {};
        if (!formData.title.trim()) validationErrors.title = "Title is required.";
        if (!formData.body.trim()) validationErrors.body = "Body is required.";
        if (!formData.author.trim()) validationErrors.author = "Author is required.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);

        if (!validateForm()) return;

        try {
            const response = await fetch('http://145.24.223.232:8000/setups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 400) {
                setServerError("Invalid data. Please check your inputs.");
                return;
            }

            if (!response.ok) {
                throw new Error("HTTP error! Status: " + response.status);
            }

            navigate('/success'); // Redirect after successful submission
        } catch (error) {
            console.error('Error:', error);
            setServerError("An error occurred while submitting. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Create Setup</h1>
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

                    {serverError && <p className="text-red-600 text-center">{serverError}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 dark:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SetupsCreate;
