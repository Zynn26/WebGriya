import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login validation
    if (email && password) {
      toast.success('Login berhasil!', {
        description: `Selamat datang kembali, ${email}`,
      });
      // Reset form
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8" style={{ borderColor: '#E5D4C1', borderWidth: '1px' }}>
        <h2 className="mb-6 text-center" style={{ color: '#3E2C22' }}>Login ke Akun Anda</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" style={{ color: '#3E2C22' }}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" style={{ color: '#3E2C22' }}>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderColor: '#E5D4C1' }}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: '#A47551', color: 'white' }}
          >
            Login
          </Button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: '#5C4A3A' }}>
          Belum punya akun?{' '}
          <a href="#" className="underline" style={{ color: '#A47551' }}>
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
