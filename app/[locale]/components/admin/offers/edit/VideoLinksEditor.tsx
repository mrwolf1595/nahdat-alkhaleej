import { useState } from 'react';

interface VideoLinksEditorProps {
  videoLinks: string[];
  onChange: (links: string[]) => void;
}

export default function VideoLinksEditor({ videoLinks, onChange }: VideoLinksEditorProps) {
  const [newLink, setNewLink] = useState('');
  
  const addVideoLink = () => {
    if (!newLink.trim()) return;
    
    // Basic validation: check if it looks like a YouTube or Vimeo URL
    const isValidVideoUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.*/.test(newLink);
    
    if (!isValidVideoUrl) {
      alert('Please enter a valid YouTube or Vimeo URL');
      return;
    }
    
    onChange([...videoLinks, newLink.trim()]);
    setNewLink('');
  };
  
  const removeVideoLink = (index: number) => {
    const updatedLinks = [...videoLinks];
    updatedLinks.splice(index, 1);
    onChange(updatedLinks);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addVideoLink();
    }
  };
  
  return (
    <div className="space-y-4">
      <label className="block font-medium text-gray-700 mb-1">
        Property Videos
      </label>
      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter YouTube or Vimeo URL"
          className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          type="button"
          onClick={addVideoLink}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
      
      {videoLinks.length > 0 ? (
        <ul className="mt-3 divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
          {videoLinks.map((link, index) => (
            <li key={index} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50">
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 truncate max-w-xs"
              >
                {link}
              </a>
              <button
                type="button"
                onClick={() => removeVideoLink(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm mt-2">No video links added yet.</p>
      )}
      
      <div className="text-sm text-gray-500 mt-2">
        Add YouTube or Vimeo links to showcase property videos.
      </div>
    </div>
  );
}