export function LoginPage({ onNavigateToRegister }: { onNavigateToRegister?: () => void }) {
  return (
    <div className="space-y-4">
      {/* ... input login ... */}
      <p className="text-sm text-center text-[#3E2C22]">
        Belum punya akun?{' '}
        <button
          onClick={onNavigateToRegister}
          className="text-[#A47551] font-semibold hover:underline"
        >
          Daftar di sini
        </button>
      </p>
    </div>
  );
}
