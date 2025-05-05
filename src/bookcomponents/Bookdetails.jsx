import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Bookdetails.css';
import Navbar from './Navbar/Navbar';

const BookDetails = () => {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/ajouter/machines/${id}`)
      .then((res) => res.json())
      .then((data) => setMachine(data))
      .catch((error) => console.error('Error fetching machine details:', error));
  }, [id]);

  if (!machine) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
 <div>
  <Navbar/>
 <div className="container">
{/* Main Content */}
<div className="content">
  <div className="details-card">
    {/* Left - Image */}
    <div className="image-container">
      {machine.bookimagefile && !imageError ? (
        <img
          className="details-image"
          src={`http://localhost:4000/uploads/${machine.bookimagefile}`}
          alt="Machine"
          onError={() => setImageError(true)}
        />
      ) : (
        <p className="error-text">Image not available</p>
      )}
    </div>

    {/* Right - Information */}
    <div className="info-container">
      <h2 className="details-title">{machine.nom}</h2>
      <p className="details-text"><strong>Description:</strong> {machine.description}</p>

      {machine.file && (
        <div>
          <p><strong>File:</strong></p>
          <a href={`http://localhost:4000/ajouter/download/${machine.file}`} download>
            <button className="details-button">Download File</button>
          </a>
        </div>
      )}

    </div>
  </div>
</div>
</div>
    </div>

  );
};

export default BookDetails;
