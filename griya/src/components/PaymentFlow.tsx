import { useState } from 'react';
import { X, Upload, CreditCard, Building2, Smartphone, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Room } from './RoomDetailPage';

interface PaymentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room;
  onPaymentSuccess: (roomId: string) => void;
}

type PaymentStep = 'verification' | 'payment-method' | 'payment-details' | 'confirmation';
type IDType = 'ktp' | 'ktm' | 'sim';
type PaymentMethod = 'qris' | 'bank-transfer' | 'virtual-account';

export function PaymentFlow({ isOpen, onClose, room, onPaymentSuccess }: PaymentFlowProps) {
  const [currentStep, setCurrentStep] = useState<PaymentStep>('verification');
  const [idType, setIdType] = useState<IDType>('ktp');
  const [idNumber, setIdNumber] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
      toast.success('File berhasil diunggah');
    }
  };

  const handleVerificationNext = () => {
    if (!idNumber || !idFile) {
      toast.error('Lengkapi data verifikasi');
      return;
    }
    setCurrentStep('payment-method');
  };

  const handlePaymentMethodNext = () => {
    setCurrentStep('payment-details');
  };

  const handleConfirmPayment = () => {
    if (!agreedToTerms) {
      toast.error('Anda harus menyetujui syarat dan ketentuan');
      return;
    }
    
    toast.success('Pembayaran berhasil!', {
      description: 'Terima kasih telah melakukan pembayaran',
    });
    
    onPaymentSuccess(room.id);
    
    // Reset state
    setCurrentStep('verification');
    setIdNumber('');
    setIdFile(null);
    setAgreedToTerms(false);
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#3E2C22]">Pembayaran Kamar</h2>
          <button
            onClick={onClose}
            className="text-[#3E2C22] hover:bg-[#E5D4C1] rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#E5D4C1]" style={{ zIndex: 0 }} />
            
            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'verification' ? 'bg-[#A47551] text-white' : 
                ['payment-method', 'payment-details', 'confirmation'].includes(currentStep) ? 'bg-green-500 text-white' : 'bg-[#E5D4C1] text-[#3E2C22]'
              }`}>
                {['payment-method', 'payment-details', 'confirmation'].includes(currentStep) ? <Check size={16} /> : '1'}
              </div>
              <span className="text-xs text-[#3E2C22] mt-2">Verifikasi</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'payment-method' ? 'bg-[#A47551] text-white' : 
                ['payment-details', 'confirmation'].includes(currentStep) ? 'bg-green-500 text-white' : 'bg-[#E5D4C1] text-[#3E2C22]'
              }`}>
                {['payment-details', 'confirmation'].includes(currentStep) ? <Check size={16} /> : '2'}
              </div>
              <span className="text-xs text-[#3E2C22] mt-2">Metode</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'payment-details' ? 'bg-[#A47551] text-white' : 
                currentStep === 'confirmation' ? 'bg-green-500 text-white' : 'bg-[#E5D4C1] text-[#3E2C22]'
              }`}>
                {currentStep === 'confirmation' ? <Check size={16} /> : '3'}
              </div>
              <span className="text-xs text-[#3E2C22] mt-2">Pembayaran</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'confirmation' ? 'bg-[#A47551] text-white' : 'bg-[#E5D4C1] text-[#3E2C22]'
              }`}>
                4
              </div>
              <span className="text-xs text-[#3E2C22] mt-2">Konfirmasi</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {/* Verification Step */}
          {currentStep === 'verification' && (
            <div className="space-y-6">
              <div className="bg-[#E5D4C1]/30 rounded-lg p-4">
                <p className="text-sm text-[#3E2C22]/70">Detail Kamar:</p>
                <p className="text-[#3E2C22]">{room.name}</p>
                <p className="text-[#A47551]">Rp {room.price.toLocaleString('id-ID')} / bulan</p>
              </div>

              <div>
                <label className="text-sm text-[#3E2C22] mb-2 block">
                  Jenis Identitas:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'ktp', label: 'KTP' },
                    { value: 'ktm', label: 'KTM' },
                    { value: 'sim', label: 'SIM' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setIdType(type.value as IDType)}
                      className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                        idType === type.value
                          ? 'border-[#A47551] bg-[#A47551]/10 text-[#A47551]'
                          : 'border-[#E5D4C1] text-[#3E2C22] hover:border-[#A47551]/50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-[#3E2C22] mb-2 block">
                  Nomor Identitas:
                </label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder={`Masukkan nomor ${idType.toUpperCase()}`}
                  className="w-full p-3 rounded-xl border border-[#C19A6B] focus:outline-none focus:border-[#A47551]"
                />
              </div>

              <div>
                <label className="text-sm text-[#3E2C22] mb-2 block">
                  Upload Foto Identitas:
                </label>
                <div className="border-2 border-dashed border-[#C19A6B] rounded-xl p-6 text-center hover:border-[#A47551] transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="id-upload"
                  />
                  <label htmlFor="id-upload" className="cursor-pointer">
                    <Upload size={32} className="mx-auto mb-2 text-[#A47551]" />
                    {idFile ? (
                      <p className="text-sm text-[#3E2C22]">{idFile.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-[#3E2C22]">Klik untuk upload</p>
                        <p className="text-xs text-[#3E2C22]/60 mt-1">Format: JPG, PNG (Max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleVerificationNext}
                className="w-full py-3 rounded-full bg-[#A47551] text-white hover:bg-[#8d5f3f] transition-colors"
              >
                Lanjutkan
              </button>
            </div>
          )}

          {/* Payment Method Step */}
          {currentStep === 'payment-method' && (
            <div className="space-y-6">
              <h3 className="text-[#3E2C22]">Pilih Metode Pembayaran</h3>
              
              <div className="space-y-3">
                {/* QRIS */}
                <button
                  onClick={() => setPaymentMethod('qris')}
                  className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                    paymentMethod === 'qris'
                      ? 'border-[#A47551] bg-[#A47551]/10'
                      : 'border-[#E5D4C1] hover:border-[#A47551]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={24} className="text-[#A47551]" />
                    <div>
                      <p className="text-[#3E2C22]">QRIS</p>
                      <p className="text-xs text-[#3E2C22]/60">Bayar dengan scan QR code</p>
                    </div>
                  </div>
                </button>

                {/* Bank Transfer */}
                <button
                  onClick={() => setPaymentMethod('bank-transfer')}
                  className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                    paymentMethod === 'bank-transfer'
                      ? 'border-[#A47551] bg-[#A47551]/10'
                      : 'border-[#E5D4C1] hover:border-[#A47551]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 size={24} className="text-[#A47551]" />
                    <div>
                      <p className="text-[#3E2C22]">Transfer Bank</p>
                      <p className="text-xs text-[#3E2C22]/60">BCA, BNI, Mandiri, BRI</p>
                    </div>
                  </div>
                </button>

                {/* Virtual Account */}
                <button
                  onClick={() => setPaymentMethod('virtual-account')}
                  className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                    paymentMethod === 'virtual-account'
                      ? 'border-[#A47551] bg-[#A47551]/10'
                      : 'border-[#E5D4C1] hover:border-[#A47551]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={24} className="text-[#A47551]" />
                    <div>
                      <p className="text-[#3E2C22]">Virtual Account</p>
                      <p className="text-xs text-[#3E2C22]/60">Bayar melalui VA</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep('verification')}
                  className="flex-1 py-3 rounded-full border-2 border-[#A47551] text-[#A47551] hover:bg-[#A47551]/10 transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={handlePaymentMethodNext}
                  className="flex-1 py-3 rounded-full bg-[#A47551] text-white hover:bg-[#8d5f3f] transition-colors"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          )}

          {/* Payment Details Step */}
          {currentStep === 'payment-details' && (
            <div className="space-y-6">
              <h3 className="text-[#3E2C22]">Detail Pembayaran</h3>

              {paymentMethod === 'qris' && (
                <div className="bg-white border-2 border-[#E5D4C1] rounded-xl p-6">
                  <div className="w-64 h-64 bg-gradient-to-br from-[#E5D4C1] to-[#D4C4B0] mx-auto rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Smartphone size={48} className="mx-auto mb-2 text-[#A47551]" />
                      <p className="text-sm text-[#3E2C22]">QR Code</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-[#3E2C22]/70">
                    Scan QR code dengan aplikasi pembayaran Anda
                  </p>
                </div>
              )}

              {paymentMethod === 'bank-transfer' && (
                <div className="bg-[#E5D4C1]/30 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#3E2C22]/70">Bank:</span>
                    <span className="text-[#3E2C22]">BCA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3E2C22]/70">Nomor Rekening:</span>
                    <span className="text-[#3E2C22]">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3E2C22]/70">Atas Nama:</span>
                    <span className="text-[#3E2C22]">MyGriya Management</span>
                  </div>
                  <div className="flex justify-between border-t border-[#C19A6B] pt-3 mt-3">
                    <span className="text-[#3E2C22]">Total Bayar:</span>
                    <span className="text-[#A47551]">Rp {room.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'virtual-account' && (
                <div className="bg-[#E5D4C1]/30 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#3E2C22]/70">Virtual Account:</span>
                    <span className="text-[#3E2C22]">8012345678901234</span>
                  </div>
                  <div className="flex justify-between border-t border-[#C19A6B] pt-3 mt-3">
                    <span className="text-[#3E2C22]">Total Bayar:</span>
                    <span className="text-[#A47551]">Rp {room.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep('payment-method')}
                  className="flex-1 py-3 rounded-full border-2 border-[#A47551] text-[#A47551] hover:bg-[#A47551]/10 transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setCurrentStep('confirmation')}
                  className="flex-1 py-3 rounded-full bg-[#A47551] text-white hover:bg-[#8d5f3f] transition-colors"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {currentStep === 'confirmation' && (
            <div className="space-y-6">
              <h3 className="text-[#3E2C22]">Konfirmasi Pembayaran</h3>

              <div className="bg-[#E5D4C1]/30 rounded-xl p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#3E2C22]/70">Kamar:</span>
                  <span className="text-[#3E2C22]">{room.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3E2C22]/70">Harga:</span>
                  <span className="text-[#3E2C22]">Rp {room.price.toLocaleString('id-ID')} / bulan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3E2C22]/70">Metode Pembayaran:</span>
                  <span className="text-[#3E2C22]">
                    {paymentMethod === 'qris' && 'QRIS'}
                    {paymentMethod === 'bank-transfer' && 'Transfer Bank'}
                    {paymentMethod === 'virtual-account' && 'Virtual Account'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3E2C22]/70">Verifikasi ID:</span>
                  <span className="text-[#3E2C22]">{idType.toUpperCase()} - {idNumber}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-[#3E2C22]">
                  Saya menyetujui syarat dan ketentuan yang berlaku serta bertanggung jawab atas data yang saya berikan
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep('payment-details')}
                  className="flex-1 py-3 rounded-full border-2 border-[#A47551] text-[#A47551] hover:bg-[#A47551]/10 transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={handleConfirmPayment}
                  disabled={!agreedToTerms}
                  className="flex-1 py-3 rounded-full bg-[#A47551] text-white hover:bg-[#8d5f3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
