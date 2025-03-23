import {useState} from "react";
import {useNavigate} from "react-router";

function SetupsCreate() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        author: '',

    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);

    // Generieke handler voor het bijwerken van de state
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData, [name]: value,
        });

        setErrors({...errors, [name]: ''});

    };

    const validateForm = () => {
        let validationErrors = {};
        if (!formData.title.trim()) validationErrors.title = "Title is required.";
        if (!formData.body.trim()) validationErrors.body = "body is required.";
        if (!formData.author.trim()) validationErrors.author = "author is required.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Formulier verzonden:', formData);

        if (!validateForm()) return;


        try {
            const response = await fetch('http://145.24.223.232:8000/setups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    body: formData.body,
                    author: formData.author,
                }),
            });

            if (response.status === 400) {
                setServerError("Invalid data. Please check your inputs.");
                return;
            }

            if (!response.ok) {
                throw new Error("HTTP error! Status: " + response.status);
            }

            const result = await response.json();
            console.log('Success:', result);
            navigate('/succes'); // Redirect after successful submission
        } catch (error) {
            console.error('Error:', error);
            setServerError("An error occurred while submitting. Please try again.");
        }
    };

    return (
        <>
            <h1>Create</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">body:</label>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="author">author:</label>
                    <textarea
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}

                </div>
                {serverError && <p className="text-red-600 text-center mt-2">{serverError}</p>}

                <button type="submit">Send</button>
            </form>
        </>
    );
}

export default SetupsCreate;
