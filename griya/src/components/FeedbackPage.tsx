import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

export function FeedbackPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Add feedback submission logic here
    alert('Terima kasih atas feedback Anda!');
    setFormData({
      nama: '',
      email: '',
      subjek: '',
      pesan: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8" style={{ borderColor: '#E5D4C1', borderWidth: '1px' }}>
        <h2 className="mb-2" style={{ color: '#3E2C22' }}>Kritik & Saran</h2>
        <p className="mb-6" style={{ color: '#5C4A3A' }}>
          Kami sangat menghargai masukan Anda untuk meningkatkan layanan kami.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama" style={{ color: '#3E2C22' }}>Nama</Label>
            <Input
              id="nama"
              name="nama"
              type="text"
              placeholder="Masukkan nama Anda"
              value={formData.nama}
              onChange={handleChange}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" style={{ color: '#3E2C22' }}>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjek" style={{ color: '#3E2C22' }}>Subjek</Label>
            <Input
              id="subjek"
              name="subjek"
              type="text"
              placeholder="Topik feedback Anda"
              value={formData.subjek}
              onChange={handleChange}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pesan" style={{ color: '#3E2C22' }}>Pesan</Label>
            <Textarea
              id="pesan"
              name="pesan"
              placeholder="Tuliskan kritik atau saran Anda di sini..."
              value={formData.pesan}
              onChange={handleChange}
              required
              rows={6}
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: '#A47551', color: 'white' }}
          >
            Kirim Feedback
          </Button>
        </form>
      </div>
    </div>
  );
}
