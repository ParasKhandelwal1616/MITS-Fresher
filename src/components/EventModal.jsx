import React from 'react';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  const backendUrl = 'http://localhost:5000';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-4xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {event.promoVideoUrl && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Promo Video</h3>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${event.promoVideoUrl.split('v=')[1]}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {event.googleFormLink && (
              <a
                href={event.googleFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Register Here
              </a>
            )}
          </div>
          <div>
            {event.posterUrl && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Poster</h3>
                <img src={`${backendUrl}${event.posterUrl}`} alt={event.title} className="rounded-lg w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
