// pages/contact.tsx

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f9fafc] to-[#fffaf2] px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 md:flex md:gap-16 max-w-5xl w-full">
        
        {/* Left - Contact Info */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-6">
            We are committed to processing the information in order to contact you and talk about your project.
          </p>

          <div className="space-y-4 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>hamdouch.par@gmail.com</span>
            </div>
            <div className="flex items-start gap-2">
              <span>🏠</span>
              <div>
                <p>RUE BACHIR SFAR, 8011</p>
                <p>Dar-Chaabane, Tunisia</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>+216 23 200 130</span>
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <form className="md:w-1/2 space-y-4 w-full">
          <input
            type="text"
            placeholder="Name*"
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="email"
            placeholder="Email*"
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="text"
            placeholder="Website*"
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-md hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
