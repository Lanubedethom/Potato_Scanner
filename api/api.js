const API_URL = 'http://127.0.0.1:8000/predict/';

export const predictEspecie = async (selectedImage) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: 'photo.jpg',
      type: 'image/jpeg'
    });

    console.log('uri:', selectedImage);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.detail}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
};