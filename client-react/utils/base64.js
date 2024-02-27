export async function base64(file) {
    const reader = new FileReader();

    reader.onload = () => {
      return reader
    };

    reader.readAsDataURL(file);
}