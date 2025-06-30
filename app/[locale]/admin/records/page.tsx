// app/admin/records/page.tsx

'use client';

import { useState } from 'react';
import  {RecordTabs}  from '../../components/admin/records/RecordTabs';
import  {RecordFilter}  from '../../components/admin/records/RecordFilter';
import { RecordCards } from '../../components/admin/records/RecordCards';
import { RecordFormModal } from '../../components/admin/records/RecordFormModal';
import { AuctionRecord, EvaluationRecord, NewRecord, RecordType, SalesRecord } from '../../../../types/records';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function AdminRecordsPage() {
  const [activeTab, setActiveTab] = useState<RecordType>('sales');
  const [records, setRecords] = useState<NewRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editRecord, setEditRecord] = useState<NewRecord | null>(null);
  const [filters, setFilters] = useState({
    propertyType: '',
    location: '',
    priceRange: '',
    date: '',
  });

  const handleSave = async (record: NewRecord) => {
    try {
  
      if (editRecord) {
        const res = await fetch(`/api/admin/records/${record._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        const data = await res.json();
        setRecords((prev) =>
          prev.map((r) => (r._id === data._id || r._id === data.id ? data : r))
        );
        toast.success('Record updated successfully');
      } else {
        const res = await fetch('/api/admin/records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        const data = await res.json();
        // No need to assign data.record to updatedRecord
        setRecords((prev) => [data.record, ...prev]);
        toast.success('Record created successfully');
      }
  
      setEditRecord(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };
  

  const handleDelete = async (id: string | number) => {
    try {
      await fetch(`/api/admin/records/${id}`, {
        method: 'DELETE',
      });
      setRecords((prev) => prev.filter((r) => r._id !== id));
      toast.success('Record deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete record');
    }
  };
  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch('/api/admin/records', { cache: 'no-store' });
        const data = await res.json();
        setRecords(data);
      } catch (error) {
        console.error('Failed to fetch records:', error);
        toast.error('Failed to load records');
      }
    };
  
    fetchRecords();
  }, []);
  
  const filteredRecords = records.filter((record) => {
    let priceValue = '';
  
    if (record.type === 'sales') priceValue = (record as SalesRecord).soldPrice;
    if (record.type === 'evaluations') priceValue = (record as EvaluationRecord).estimatedValue;
    if (record.type === 'auctions') priceValue = (record as AuctionRecord).startingBid;
  
    const price = parseInt(priceValue?.replace(/[^0-9]/g, '') || '0');
  
    return (
      record.type === activeTab &&
      (!filters.propertyType || record.propertyType === filters.propertyType) &&
      (!filters.location || record.location === filters.location) &&
      (!filters.priceRange ||
        (filters.priceRange === '< 1M' && price < 1_000_000) ||
        (filters.priceRange === '1M - 3M' && price >= 1_000_000 && price <= 3_000_000) ||
        (filters.priceRange === '> 3M' && price > 3_000_000)) &&
      (!filters.date || record.date === filters.date)
    );
  });
  
  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Records</h1>
        <button
          onClick={() => {
            setEditRecord(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Record
        </button>
      </div>

      <RecordTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <RecordFilter filters={filters} setFilters={setFilters} />
      <RecordCards
        records={filteredRecords}
        onEdit={(record) => {
          setEditRecord(record);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
      {showForm && (
        <RecordFormModal
          record={editRecord}
          onClose={() => {
            setEditRecord(null);
            setShowForm(false);
          }}
          onSave={handleSave}
          defaultType={activeTab}
        />
      )}
    </section>
  );
}
