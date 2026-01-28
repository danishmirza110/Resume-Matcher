export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {/* Branding Section */}
        <div>
          <h4 className="font-bold text-lg">Match My Resume</h4>
          <p className="text-gray-400">AI-powered resume matching made simple.</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          {['About', 'Features', 'Contact'].map((link) => (
            <a
              key={link}
              href={`${link.toLowerCase()}`}
              className="text-gray-400 block hover:text-white transition"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Connect Section */}
        <div>
          <h4 className="font-bold mb-4">Connect With Us</h4>
          <p className="text-gray-400 mb-2">mirzadanish8109@gmail.com</p>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 mt-8">© 2025 Match My Resume. All Rights Reserved.</p>
    </footer>
  );
}
