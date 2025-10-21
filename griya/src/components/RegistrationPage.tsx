import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export function RegistrationPage() {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    noTelepon: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password tidak cocok', {
        description: 'Pastikan password dan konfirmasi password sama.',
      });
      return;
    }
    
    // Simulate registration validation
    if (formData.namaLengkap && formData.email && formData.password) {
      toast.success('Registrasi berhasil!', {
        description: `Akun untuk ${formData.namaLengkap} telah dibuat. Silakan login.`,
      });
      // Reset form
      setFormData({
        namaLengkap: '',
        email: '',
        noTelepon: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8" style={{ borderColor: '#E5D4C1', borderWidth: '1px' }}>
        <h2 className="mb-6 text-center" style={{ color: '#3E2C22' }}>Daftar Akun Baru</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="namaLengkap" style={{ color: '#3E2C22' }}>Nama Lengkap</Label>
            <Input
              id="namaLengkap"
              name="namaLengkap"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.namaLengkap}
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
            <Label htmlFor="noTelepon" style={{ color: '#3E2C22' }}>No. Telepon</Label>
            <Input
              id="noTelepon"
              name="noTelepon"
              type="tel"
              placeholder="08xx xxxx xxxx"
              value={formData.noTelepon}
              onChange={handleChange}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" style={{ color: '#3E2C22' }}>Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" style={{ color: '#3E2C22' }}>Konfirmasi Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: '#A47551', color: 'white' }}
          >
            Daftar
          </Button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: '#5C4A3A' }}>
          Sudah punya akun?{' '}
          <a href="#" className="underline" style={{ color: '#A47551' }}>
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
}
