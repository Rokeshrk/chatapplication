import React, { useState } from 'react';
import { z } from 'zod';

const participantSchema = z.object({
  name: z.string().min(2),
  photo: z.string().url(),
  email: z.string().email(), // Add a validation rule for the email
});

type Participant = z.infer<typeof participantSchema>;

interface ParticipantFormProps {
  onAddParticipant: (participant: Participant) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ onAddParticipant }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsedParticipant = participantSchema.parse({ name, photo, email });
      onAddParticipant(parsedParticipant);
      setName('');
      setPhoto('');
      setEmail('');
    } catch (error) {
      console.error('Invalid participant:', error);
    }
  };

  return (
    <div>
      <h2>Add Participant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='font-light'>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className='font-light'>Photo URL:</label>
          <input type="url" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        </div>
        <div>
          <label className='font-light'>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer px-6 text-center">Add Another</button>
      </form>
    </div>
  );
};

export default ParticipantForm;
