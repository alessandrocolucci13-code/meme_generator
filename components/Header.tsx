import Auth from './Auth';

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-primary to-primary-dark py-6 lg:py-8 shadow-lg relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex-1 hidden sm:block"></div>
          <div className="flex-1 text-center order-2 sm:order-1">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex items-center justify-center gap-4 text-shadow-lg">
              <span className="text-5xl sm:text-6xl animate-bounce-custom">🎭</span>
              Meme Generator
            </h1>
            <p className="text-base sm:text-lg text-white/90 font-normal">
              Create hilarious memes in seconds
            </p>
          </div>
          <div className="flex-1 flex justify-end order-1 sm:order-2 w-full sm:w-auto">
            <Auth />
          </div>
        </div>
      </div>
    </header>
  );
}
