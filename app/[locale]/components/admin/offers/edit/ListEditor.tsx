'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Plus, X } from 'lucide-react';

interface ListEditorProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const ListEditor: FC<ListEditorProps> = ({ label, value, placeholder, onChange }) => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  // Parse items from string on initial load and when value changes
  useEffect(() => {
    const itemsArray = value
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);
    setItems(itemsArray);
  }, [value]);

  // Update the parent component when items change
  const updateParent = (newItems: string[]) => {
    onChange(newItems.join('\n'));
  };

  const addItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, newItem.trim()];
      setItems(updatedItems);
      updateParent(updatedItems);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
    updateParent(updatedItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    exit: { 
      x: -10, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
        <List size={16} className="text-blue-600" />
        <span>{label}</span>
      </label>

      {/* Visual items list */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-3 space-y-2"
          >
            {items.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                variants={itemVariants}
                exit="exit"
                layout
                className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-2 pr-1 group"
              >
                <span className="flex-grow text-sm px-2">{item}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(index)}
                  className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add new item */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
          placeholder={placeholder || `Add a new ${label.toLowerCase()} item...`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addItem}
          disabled={!newItem.trim()}
          className={`p-2 rounded-lg ${
            newItem.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          } transition-colors`}
        >
          <Plus size={18} />
        </motion.button>
      </div>

      {/* Hidden textarea for compatibility */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="hidden"
      />
    </div>
  );
};

export default ListEditor;