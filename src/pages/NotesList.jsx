import React, {useState, useEffect} from 'react';

function NotesList() {
    const [notes, setNotes] = useState(null); // Renamed to "notes" for clarity

    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await fetch('http://145.24.223.232:8000/setups', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json', // Inform the server that you expect JSON data
                    },
                });

                const data = await response.json();
                setNotes(data.items);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        }

        fetchNotes();
    }, []);


    return (
        <div>
            {!notes ? (
                <p>Loading notes...</p>
            ) : (
                <div className={"flex flex-col"}>
                    {notes.map((setup, index) => (

                            <article key={index} className="outline p-3 m-3">
                                <h2>{setup.title}</h2>
                            </article>

                    ))}
                </div>
            )}
        </div>
    );
}

export default NotesList;
