import { useState } from 'react';
import { X, Send, Phone, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContactAdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
}

export function ContactAdminDialog({ isOpen, onClose, roomName }: ContactAdminDialogProps) {
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      toast.success('Pesan berhasil dikirim!', {
        description: 'Admin akan menghubungi Anda dalam 1x24 jam',
      });
      
      // Simulate admin notification
      setTimeout(() => {
        toast.info('Notifikasi dari Admin', {
          description: `${roomName} sedang dalam proses verifikasi ketersediaan. Kami akan menghubungi Anda segera.`,
        });
      }, 3000);
      
      setMessage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#3E2C22]">Hubungi Admin</h2>
          <button
            onClick={onClose}
            className="text-[#3E2C22] hover:bg-[#E5D4C1] rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Room Info */}
        <div className="bg-[#E5D4C1]/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-[#3E2C22]/70">Kamar yang ditanyakan:</p>
          <p className="text-[#3E2C22]">{roomName}</p>
        </div>

        {/* Contact Method Selection */}
        <div className="mb-6">
          <p className="text-sm text-[#3E2C22] mb-3">Metode Kontak:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setContactMethod('whatsapp')}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                contactMethod === 'whatsapp'
                  ? 'border-[#A47551] bg-[#A47551]/10'
                  : 'border-[#E5D4C1] hover:border-[#A47551]/50'
              }`}
            >
              <MessageCircle size={20} className="text-[#A47551]" />
              <span className="text-xs text-[#3E2C22]">WhatsApp</span>
            </button>
            <button
              onClick={() => setContactMethod('email')}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                contactMethod === 'email'
                  ? 'border-[#A47551] bg-[#A47551]/10'
                  : 'border-[#E5D4C1] hover:border-[#A47551]/50'
              }`}
            >
              <Mail size={20} className="text-[#A47551]" />
              <span className="text-xs text-[#3E2C22]">Email</span>
            </button>
            <button
              onClick={() => setContactMethod('phone')}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                contactMethod === 'phone'
                  ? 'border-[#A47551] bg-[#A47551]/10'
                  : 'border-[#E5D4C1] hover:border-[#A47551]/50'
              }`}
            >
              <Phone size={20} className="text-[#A47551]" />
              <span className="text-xs text-[#3E2C22]">Telepon</span>
            </button>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-[#3E2C22] mb-2 block">
              Pesan Anda:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Saya ingin menanyakan ketersediaan kamar..."
              className="w-full h-32 p-3 rounded-xl border border-[#C19A6B] focus:outline-none focus:border-[#A47551] resize-none"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border-2 border-[#A47551] text-[#A47551] hover:bg-[#A47551]/10 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-full bg-[#A47551] text-white hover:bg-[#8d5f3f] transition-colors flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
