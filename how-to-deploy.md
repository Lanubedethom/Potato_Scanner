
Paso 2: Instalar eas-cli

npm install -g eas-cli

Instala eas-cli globalmente:

Paso 3: Configurar eas-cli
Inicia sesión en tu cuenta de Expo utilizando eas-cli:
eas login

Paso 4: Configurar eas.json
Crea un archivo eas.json en la raíz de tu proyecto para configurar la construcción de EAS:
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}

eas.json
Paso 5: Construir el APK o AAB
Para construir un APK (Android Package) o AAB (Android App Bundle), utiliza el siguiente comando:
eas build -p android --profile production

Paso 6: Descargar el Archivo de Construcción
Una vez que la construcción esté completa, EAS te proporcionará un enlace para descargar el archivo APK o AAB.

Paso 7: Probar el APK en un Dispositivo Android
Si has construido un APK, puedes probarlo directamente en un dispositivo Android:

Conecta tu dispositivo Android a tu computadora.
Copia el archivo APK al dispositivo.
Abre el archivo APK en el dispositivo para instalar la aplicación.
Resumen
Eliminar la Propiedad entryPoint de app.json: Asegúrate de que app.json esté correctamente configurado.
Instalar eas-cli: Utiliza npm install -g eas-cli para instalar eas-cli.
Configurar eas-cli: Inicia sesión en tu cuenta de Expo utilizando eas login.
Configurar eas.json: Crea un archivo eas.json en la raíz de tu proyecto.
Construir el APK o AAB: Utiliza eas build -p android --profile production para construir el archivo.
Descargar y Probar: Descarga el archivo APK o AAB y pruébalo en un dispositivo Android.