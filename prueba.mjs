import { predictEspecie } from "./api/api.js";

const testPredictEspecie = async () => {
  const testImageUri = "imagen.jpg";

  try {
    const data = await predictEspecie(testImageUri);
    console.log("Predicción recibida:", data);
  } catch (error) {
    console.error("Error al obtener la predicción:", error);
  }
};

testPredictEspecie();