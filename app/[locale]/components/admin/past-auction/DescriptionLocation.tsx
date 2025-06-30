'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PastAuction } from '@/types/PastAuction';

interface Props {
  formData: Partial<PastAuction>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function DescriptionLocation({ formData, onChange }: Props) {
  return (
    <div className="rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-600">
        Description & Location
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g., North Riyadh"
            value={formData.location || ''}
            onChange={onChange}
          />
        </div>

        <div>
          <Label htmlFor="mapLink">Google Maps Link</Label>
          <Input
            id="mapLink"
            name="mapLink"
            placeholder="https://maps.google.com/..."
            value={formData.mapLink || ''}
            onChange={onChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Auction Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Write a brief description of this auction..."
          value={formData.description || ''}
          onChange={onChange}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
