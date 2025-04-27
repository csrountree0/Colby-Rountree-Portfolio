import { useState, useEffect } from 'react';

function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const imageIds = Array.from({ length: 64 }, () => Math.floor(Math.random() * 600) + 1);
            const imageUrls = imageIds.map(id => `https://picsum.photos/seed/${id}/1000`);
            setImages(imageUrls);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <>
                {loading ? (
                    <div className="text-center text-xl text-white my-8">Loading...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((imageUrl, index) => (
                                <div 
                                    key={index} 
                                    className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500 hover:-translate-y-1"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Random image ${index + 1}`}
                                        loading="lazy"
                                        className="w-full h-full object-contain cursor-pointer"
                                        onClick={() => setSelectedImage(imageUrl)}
                                    />
                                </div>
                            ))}
                        </div>
                        {selectedImage && (
                            <div 
                                className="absolute inset-0 mt-7 mb-7 bg-gray-500 bg-opacity-80 flex items-center justify-center z-50"
                                onClick={() => setSelectedImage(null)}
                            >
                                <div className="relative max-w-full max-h-full">
                                    <img
                                        src={selectedImage}
                                        alt="Selected image"
                                        className="max-h-[80vh] object-contain"
                                    />
                                    <button 
                                        className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(null);
                                        }}
                                    >
                                        <div className="material-icons align-middle">close</div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
        </>
    );
}

export default GalleryPage;