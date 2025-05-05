import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, Form, Button } from 'antd';
import Navbar from './Navbar/Navbar';

const Booklist = () => {
  const [machines, setMachines] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [newFile, setNewFile] = useState(null); // For updated file
  const [newImageFile, setNewImageFile] = useState(null); // For updated image file
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [currentMachine, setCurrentMachine] = useState(null); // For holding the current machine details
  // Inside your component
const [searchQuery, setSearchQuery] = useState('');

// Filter books based on search query
const filteredBooks = machines.filter(machine =>
  machine.nom.toLowerCase().includes(searchQuery.toLowerCase())
);

  const navigate = useNavigate();

  // Fetching machines from the backend when component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/ajouter/books')
      .then((res) => {
        setMachines(res.data);
      })
      .catch((error) => console.error('Error fetching machines:', error));
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Book?');
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:4000/ajouter/machines/${id}`);
        if (response.status === 200) {
          setMachines((prevMachines) => prevMachines.filter((machine) => machine.id !== id));
        } else {
          console.error('Error deleting machine', response);
        }
      } catch (error) {
        console.error('Error deleting machine:', error);
      }
    }
  };

  // Handle opening the modal with the current machine details
  const handleUpdate = (machine) => {
    setCurrentMachine(machine); // Set current machine's details in state
    setShowModal(true); // Show the modal
  };

  // Handling form submission to update the machine
  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('nom', values.nom);
      formData.append('description', values.description);

      if (newFile) formData.append('file', newFile);
      if (newImageFile) formData.append('bookimagefile', newImageFile);

      const response = await axios.put(`http://localhost:4000/ajouter/machines/${currentMachine.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('Machine updated successfully!');
        setMachines((prevMachines) =>
          prevMachines.map((machine) => (machine.id === currentMachine.id ? response.data.machine : machine))
        );
        setShowModal(false); // Close the modal after successful update
      } else {
        alert('Error updating machine');
      }
    } catch (error) {
      console.error('Error updating machine:', error);
      alert('Error updating machine');
    }
  };
  return (
    <div style={{ 
        background: 'radial-gradient(circle at top, #f0f4ff 0%, #ffffff 100%)',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        paddingBottom: '40px'
    }}>
        <Navbar />
        
        {/* Main Content */}
        <div style={{ 
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '100px 40px 0'
        }}>
            {/* Header Section */}
            <div style={{ 
                marginBottom: '60px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '40px 0'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-200px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
                
                <h1 style={{
                    fontSize: '3.5rem',
                    color: 'rgba(15, 23, 42, 0.9)',
                    fontWeight: '700',
                    letterSpacing: '-0.03em',
                    marginBottom: '15px',
                    position: 'relative',
                    background: 'linear-gradient(45deg, #4f46e5, #9333ea)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}>
                    Infinite Library
                </h1>
                
                {/* Search Bar */}
                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    position: 'relative',
                    backdropFilter: 'blur(12px)',
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '6px 6px 6px 25px'
                    }}>
                        <input
                            type="text"
                            placeholder="Explore 12,356 titles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                flex: 1,
                                border: 'none',
                                background: 'transparent',
                                fontSize: '1.1rem',
                                padding: '18px 15px',
                                outline: 'none',
                                color: '#1e293b',
                                '::placeholder': {
                                    color: '#94a3b8',
                                    fontWeight: '400'
                                }
                            }}
                        />
                        <button style={{
                            background: 'linear-gradient(45deg, #4f46e5, #6366f1)',
                            border: 'none',
                            borderRadius: '14px',
                            padding: '16px 30px',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            ':hover': {
                                transform: 'scale(0.98)'
                            }
                        }}>
                            🔍 Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Book Grid */}
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '30px',
                padding: '0 20px'
            }}>
                {filteredBooks.map((book) => (
                    <div key={book.id} style={{
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        overflow: 'hidden',
                        position: 'relative',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        ':hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                        }
                    }}>
                        {/* Book Cover */}
                        <div style={{
                            height: '240px',
                            background: book.bookimagefile 
                                ? `url(http://localhost:4000/uploads/${book.bookimagefile}) center/cover`
                                : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.2))',
                                height: '60px'
                            }} />
                            
                            {/* Floating Badge */}
                            {book.category && (
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(255,255,255,0.9)',
                                    padding: '8px 15px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    color: '#4f46e5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#4f46e5',
                                        borderRadius: '50%'
                                    }} />
                                    {book.category}
                                </div>
                            )}
                        </div>

                        {/* Book Info */}
                        <div style={{ padding: '24px' }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                color: '#1e293b',
                                margin: '0 0 12px',
                                fontWeight: '600',
                                lineHeight: '1.3',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {book.nom}
                            </h3>
                            
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '15px'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: '#e0e7ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ color: '#4f46e5' }}>⭐</span>
                                </div>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#64748b',
                                    fontWeight: '500'
                                }}>
                                    4.8/5 • 2023
                                </span>
                            </div>

                            <p style={{
                                color: '#64748b',
                                fontSize: '0.95rem',
                                lineHeight: '1.5',
                                marginBottom: '20px',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {book.description}
                            </p>

                            {/* Action Buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'space-between'
                            }}>
                                <button
                                    onClick={() => navigate(`/machines/${book.id}`)}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: 'rgba(79, 70, 229, 0.1)',
                                        color: '#4f46e5',
                                        border: '1px solid rgba(79, 70, 229, 0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        ':hover': {
                                            background: 'rgba(79, 70, 229, 0.15)'
                                        }
                                    }}
                                >
                                    <span>📖 Preview</span>
                                </button>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => handleUpdate(book)}
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            background: 'rgba(245, 158, 11, 0.1)',
                                            color: '#f59e0b',
                                            border: '1px solid rgba(245, 158, 11, 0.2)',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            ':hover': {
                                                background: 'rgba(245, 158, 11, 0.15)'
                                            }
                                        }}
                                    >
                                        ✎
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: '#ef4444',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            ':hover': {
                                                background: 'rgba(239, 68, 68, 0.15)'
                                            }
                                        }}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Update Modal */}
        <Modal
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
            bodyStyle={{ padding: '0' }}
            style={{ top: '40px', borderRadius: '24px' }}
            width={600}
        >
            <div style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                padding: '40px',
                borderRadius: '24px'
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    color: '#1e293b',
                    marginBottom: '30px',
                    fontWeight: '600'
                }}>
                    Edit Book Details
                </h2>
                
                <Form
                    initialValues={currentMachine}
                    onFinish={handleFormSubmit}
                    layout="vertical"
                >
                    <Form.Item 
                        label="Title"
                        name="nom"
                        style={{ marginBottom: '20px' }}
                    >
                        <Input 
                            style={{
                                padding: '14px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                background: 'rgba(255,255,255,0.8)'
                            }}
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        label="Description"
                        name="description"
                        style={{ marginBottom: '20px' }}
                    >
                        <Input.TextArea 
                            rows={4}
                            style={{
                                padding: '14px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                background: 'rgba(255,255,255,0.8)'
                            }}
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        label="Cover Image"
                        style={{ marginBottom: '30px' }}
                    >
                        <div style={{
                            border: '2px dashed #e2e8f0',
                            borderRadius: '16px',
                            padding: '30px',
                            textAlign: 'center',
                            transition: 'all 0.3s',
                            background: 'rgba(255,255,255,0.6)',
                            ':hover': {
                                borderColor: '#818cf8',
                                background: 'rgba(255,255,255,0.8)'
                            }
                        }}>
                            <input 
                                type="file" 
                                onChange={(e) => setNewImageFile(e.target.files[0])}
                                id="file-upload"
                                style={{ display: 'none' }}
                            />
                            <label 
                                htmlFor="file-upload"
                                style={{
                                    cursor: 'pointer',
                                    color: '#4f46e5',
                                    fontWeight: '500',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(79, 70, 229, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px'
                                }}>
                                    📤
                                </div>
                                <div>
                                    Drag & drop or <span style={{ color: '#6366f1' }}>browse files</span>
                                    <br />
                                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                                        PNG, JPG up to 5MB
                                    </span>
                                </div>
                            </label>
                        </div>
                    </Form.Item>
                    
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(45deg, #4f46e5, #6366f1)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            ':hover': {
                                transform: 'scale(0.98)'
                            }
                        }}
                    >
                        Update Book
                    </button>
                </Form>
            </div>
        </Modal>
    </div>
);
};

export default Booklist;
