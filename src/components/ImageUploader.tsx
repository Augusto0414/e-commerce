import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { ArrowUpToLine, Eye, Trash2, X } from 'lucide-react';

const ImageUploader: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            const uniqueImages = newImages.filter((newImage) => !images.includes(newImage));
            setImages((prevImages) => [...prevImages, ...uniqueImages]);
        }
    };

    const handleImageRemove = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleImagePreview = (image: string, e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPreviewImage(image);
    };

    const closePreview = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPreviewImage(null);
    };

    return (
        <div>
            <div className="flex space-x-2">
                {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={image}
                            alt={`Upload Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex justify-between items-start p-1">
                            <button
                                className="bg-gray-700 bg-opacity-50 text-white p-1 rounded"
                                title="Preview"
                                onClick={(e) => handleImagePreview(image, e)}
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button
                                className="bg-red-600 bg-opacity-50 text-white p-1 rounded"
                                title="Remove"
                                onClick={() => handleImageRemove(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {images.length < 4 && (
                    <label className="relative w-24 h-24 bg-gray-200 rounded-lg  border border-dashed border-gray-900 flex items-center justify-center cursor-pointer">
                        <ArrowUpToLine className="w-6 h-6 text-gray-500" />
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageUpload}
                        />
                    </label>
                )}
            </div>

            {previewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg relative max-w-md w-full">
                        <button
                            className="absolute top-0 right-0 p-2 text-gray-700"
                            onClick={closePreview}
                        >
                            <X />
                        </button>
                        <img src={previewImage} alt="Preview" className="max-w-full max-h-80 object-contain mx-auto" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
